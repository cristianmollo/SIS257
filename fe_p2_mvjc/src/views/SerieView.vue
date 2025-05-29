<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import SerieList from '../components/serie/SerieList.vue';
import SerieSave from '../components/serie/SerieSave.vue';

const mostrarDialog = ref<boolean>(false);
const SerieListRef = ref<typeof SerieList | null>(null);
const serieEdit = ref<any>(null);

function handleCreate() {
  serieEdit.value = null;
  mostrarDialog.value = true;
}

function handleEdit(serie: any) {
  serieEdit.value = { ...serie }; // Asegúrate de copiar el objeto
  mostrarDialog.value = true;
}

function handleCloseDialog() {
  mostrarDialog.value = false;
}

function handleGuardar() {
  SerieListRef.value?.obtenerLista();
}
</script>

<template>
  <div class="m-8">
    <h1>Series</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <SerieList ref="SerieListRef" @edit="handleEdit" />
    <SerieSave 
      :mostrar="mostrarDialog"
      :serie="{ ...serieEdit, tipoClasificacion: serieEdit?.tipoClasificacion || '' }"
      :modoEdicion="!!serieEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>