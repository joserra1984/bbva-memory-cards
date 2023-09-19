import { mount } from '@vue/test-utils';
import HeaderComponent from '@/components/HeaderComponent.vue';
import {it,expect, describe  } from 'vitest'
import levels from '@/assets/Levels.json';

describe('HeaderComponent', () => {
const wrapper = mount(HeaderComponent, {
    props: {
        username: 'TestName',
        timeLeft: 10,
        initialLevel: 0
    },
    data() {
        return {
        levels,
        };
    },
    });
    const usernameElement = wrapper.find('.username p');
  it('renders the username prop correctly', () => {
    const username = 'TestName';        
    expect(usernameElement.text()).toBe(username);
  });

  it('emits levelChanged event when the select element is changed', async () => {  
    expect(wrapper.isVisible()).toBe(true);       
    expect(usernameElement.exists()).toBe(true);
    await wrapper.find('select').setValue(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('levelChanged')).toBeTruthy();
  });

  it('renders the options from levels prop correctly', () => {
    const options = wrapper.findAll('option');
    expect(options.length).toBe(levels.length);

    for (let i = 0; i < levels.length; i++) {
      expect(options[i].text()).toBe(levels[i].label);
    }
  });
});
