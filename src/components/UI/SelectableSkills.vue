<script setup>
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';

  const props = defineProps({
    skills: {
      type: Array,
      default: () => [],
    },
    fixedColumns: {
      type: Number,
      default: 1,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  });

  const emit = defineEmits(['skillChange']);

  const data = reactive({
    currentSkill: null,
  });

  const canSelect = canSelect => {
    return canSelect !== false;
  };

  const selected = skill => {
    if (props.multiple) {
      return skill?.selected;
    }
    return skill.code === data.currentSkill?.code;
  };

  const skillChange = (skill, isSelected) => {
    if (!props.multiple) {
      data.currentSkill = isSelected ? skill : undefined;
      emit('skillChange', data.currentSkill);
    }
  };
</script>

<template>
  <dynamic-grid :fixed-columns="fixedColumns">
    <selectable-button
      v-for="item in props.skills"
      :key="item.code"
      :can-select="canSelect(item.canSelect)"
      :selected="selected(item)"
      @change="
        isSelected => {
          skillChange(item, isSelected);
        }
      "
    >
      <div class="item">
        <div class="title">{{ item.title }}</div>
        <div class="des">{{ item.des }}</div>
      </div>
    </selectable-button>
  </dynamic-grid>
</template>

<style scoped lang="less">
  .item {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      width: 100%;
      font-family: 'YouYuan', sans-serif;
      font-size: 14px;
      line-height: 14px;
      text-align: center;
    }

    .des {
      width: 100%;
      font-size: 12px;
      padding-top: 8px;
    }
  }
</style>
