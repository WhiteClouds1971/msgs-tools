<template>
  <div>
    <stepper :title="'场上装备数量'" :min="0"></stepper>
    <dynamic-grid class="margin-top-l" :fixed-columns="2">
      <selectable-button
        :selected="data.changed === true"
        @click="
          () => {
            data.changed = true;
          }
        "
      >
        装备数量有变化
      </selectable-button>
      <selectable-button
        :selected="data.changed === false"
        @click="
          () => {
            data.changed = false;
          }
        "
      >
        装备数量没变化
      </selectable-button>
    </dynamic-grid>
  </div>
</template>

<script setup>
  import Stepper from '@/components/UI/Stepper.vue';
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';

  const data = reactive({
    changed: null,
  });
</script>

<style lang="scss" scoped></style>
