<template>
  <div class="content-block">
    <div
      v-for="(display, index) in output.displays"
      :key="index"
      class="output-item"
    >
      <div v-if="display.title" class="output-title">
        {{ display.title }}
      </div>

      <div
        v-for="(templateCode, i) in display.selectedCodes"
        :key="templateCode"
        class="output-des"
      >
        <span v-html="renderTemplate(i, templateCode)"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { mdToHtml } from '@/plugins/marked.js';

  const props = defineProps({
    /*outputDisplay: {
      templateStore: [
        {
          code: 'name',
          templateStr: '姓名：{{name}}',
        },
        {
          code: 'age',
          templateStr: '年龄：{{age}}岁',
        },
        {
          code: 'city',
          templateStr: '城市：{{city}}',
        },
      ],
      vars: data.output.vars,
      displays: [
        {
          title: '输出',
          selectedCodes: data.output.selectedCodes,
        },
      ],
    },*/
    output: {
      type: Object,
      required: true,
    },
  });

  const renderTemplate = (index, templateCode) => {
    const template = props.output.templateStore.find(
      it => it.code === templateCode
    )?.templateStr;
    if (!template || typeof template !== 'string') return '';

    const validTemplate =
      `${index + 1}\\. ` +
      template.replace(/\{\{(\w+)}}/g, (match, key) => {
        return props.output.vars[key] !== undefined
          ? String(props.output.vars[key])
          : match;
      });
    return mdToHtml(validTemplate);
  };
</script>

<style scoped>
  .content-block {
    background-color: #f9f9f9;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  .output-item {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px dashed #e0e0e0;
  }

  .output-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .output-title {
    font-weight: 600;
    font-size: 15px;
    color: #1a1a1a;
    margin-bottom: 8px;
  }

  .output-des {
    color: #555;
    font-size: 14px;
    margin: 6px 0;
  }

  .output-des ::v-deep(p),
  .output-des ::v-deep(li) {
    margin: 0;
    font-size: 12px;
  }
</style>
