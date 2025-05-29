<script setup lang="ts">
import type { Serie } from '../../models/serie'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker';
import Dropdown from 'primevue/dropdown'; // Importar Dropdown
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'series'
const props = defineProps({
    mostrar: Boolean,
    serie: {
        type: Object as () => Serie,
        default: () => ({}) as Serie
    },
    modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) => {
        if (!value) emit('close')
    }
})

const serie = ref<Serie>({ ...props.serie })
watch(
    () => props.serie,
    (newVal) => {
        serie.value = { ...newVal }
    }
)

// Opciones para tipoClasificacion
const tipoClasificacionOptions = [
    { label: 'Todo Público', value: 'A' },
    { label: 'Para Niños', value: 'B' },
    { label: 'Mayor a 12 Años', value: 'B12' },
    { label: 'Mayor a 15 Años', value: 'B15' },
    { label: 'Público Mayor a 18 Años', value: 'C' }
];

async function handleSave() {
    try {
        const body = {
            titulo: serie.value.titulo,
            sinopsis: serie.value.sinopsis,
            director: serie.value.director,
            temporadas: serie.value.temporadas,
            categoria: serie.value.categoria,
            tipoClasificacion: serie.value.tipoClasificacion, // Asegúrate de usar "tipoClasificacion"
            fechaEstreno: serie.value.fechaEstreno,
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${serie.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        serie.value = {} as Serie
        dialogVisible.value = false
    } catch (error: any) {
        alert(error?.response?.data?.message)
    }
}
</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
            <div class="flex items-center gap-4 mb-4">
                <label for="titulo" class="font-semibold w-4">Título</label>
                <InputText id="titulo" v-model="serie.titulo" class="flex-auto" autocomplete="off" autofocus />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="sinopsis" class="font-semibold w-4">Sinopsis</label>
                <InputText id="sinopsis" v-model="serie.sinopsis" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="director" class="font-semibold w-4">Director</label>
                <InputText id="director" v-model="serie.director" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="temporadas" class="font-semibold w-4">Temporadas</label>
                <InputNumber id="temporadas" v-model="serie.temporadas" class="flex-auto" :min="1"/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="categoria" class="font-semibold w-4">Categoría</label>
                <InputText id="categoria" v-model="serie.categoria" class="flex-auto" autocomplete="off"/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="tipoClasificacion" class="font-semibold w-4">Tipo Clasificación</label>
                <Dropdown id="tipoClasificacion"
                          v-model="serie.tipoClasificacion"
                          :options="tipoClasificacionOptions"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Selecciona una clasificación"
                          class="flex-auto"/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="fechaEstreno" class="font-semibold w-4">Fecha de Estreno</label>
                <DatePicker id="fechaEstreno" v-model="serie.fechaEstreno" class="flex-auto"
                    :showIcon="true"/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
                    @click="dialogVisible = false"></Button>
                <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped></style>