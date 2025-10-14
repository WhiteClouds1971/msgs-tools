<template>
  <div class="padding-m">
    <van-divider>新抽取的 “转换类” 技能</van-divider>
    <selectable-skills
      :skills="randomSkills"
      :fixed-columns="1"
      :multiple="false"
      @skillChange="selectedSkillChange"
    ></selectable-skills>
    <van-divider>选择要替换的技能，空为添加</van-divider>
    <selectable-skills
      :skills="data.selectedSkills"
      :fixed-columns="1"
      :multiple="false"
      @skillChange="replaceSkillChange"
    ></selectable-skills>
  </div>
</template>

<script setup>
  import { random } from '@/util/random.js';
  import SelectableSkills from '@/components/UI/SelectableSkills.vue';
  import { showNotify } from 'vant';

  const props = defineProps({
    selectedSkills: Array,
    skills: Array,
    done: Function,
  });

  const data = reactive({
    selectedSkills: props.selectedSkills.map(it => {
      const skill = Object.assign({}, it);
      skill.canSelect = true;
      return skill;
    }),
    selectedSkill: null,
    replaceSkill: null,
    beforeClose: true,
  });

  const randomSkills = computed(() => {
    return random(props.skills, 2, false, props.selectedSkills).map(it => {
      const skill = Object.assign({}, it);
      skill.canSelect = true;
      return skill;
    });
  });

  const selectedSkillChange = skill => {
    if (!skill) {
      data.selectedSkill = undefined;
      return;
    }
    data.selectedSkill = Object.assign({}, skill);
    data.selectedSkill.canSelect = false;
  };
  const replaceSkillChange = skill => {
    if (!skill) {
      data.replaceSkill = undefined;
      return;
    }
    data.replaceSkill = Object.assign({}, skill);
    data.replaceSkill.canSelect = false;
  };
  const beforeClose = () => {
    return data.beforeClose;
  };
  const ok = () => {
    if (!data.selectedSkill) {
      showNotify({ type: 'warning', message: '请选择一个新技能添加或替换！' });
      data.beforeClose = false;
      return;
    }
    if (!data.replaceSkill && data.selectedSkills.length >= 4) {
      showNotify({ type: 'warning', message: '请选择一个已有技能替换！' });
      data.beforeClose = false;
      return;
    }
    data.beforeClose = true;
    props.done(data.selectedSkill, data.replaceSkill);
  };

  defineExpose({
    ok,
    beforeClose,
  });
</script>

<style lang="less" scoped></style>
