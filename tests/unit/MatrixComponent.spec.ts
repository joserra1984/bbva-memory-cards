import { mount } from '@vue/test-utils';
import {it,expect,  describe  } from 'vitest'
import MatrixComponent from '@/components/MatrixComponent.vue'; 

describe('MatrixComponent', () => {
  it('renders the matrix cells with correct classes when correct is true', async () => {
    const wrapper = mount(MatrixComponent, {
      props: {
        show: false,
        selected: [1],
        matrix: [1, 2, 3],
        correct: true,
      },
    });

    await wrapper.vm.$nextTick();

    const cells = wrapper.findAll('.card');
    expect(cells.length).toBe(3);
    expect(cells[0].classes()).toContain('win'); 
    expect(cells[1].classes()).not.toContain('win'); 
  });

  it('emits the select event when a cell is clicked', async () => {
    const wrapper = mount(MatrixComponent, {
      props: {
        show: false,
        selected: null,
        matrix: [1, 2, 3],
        correct: false,
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.find('.card').trigger('click');

    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')[0]).toEqual([1]); 
  });
});
