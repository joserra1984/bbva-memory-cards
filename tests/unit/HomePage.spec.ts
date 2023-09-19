import { mount } from '@vue/test-utils'
import { it, expect, describe } from 'vitest'
import HomePage from '@/views/HomePage.vue';

const wrapper = mount(HomePage);
const submitButton = wrapper.find('.login-button');
const input = wrapper.find('.login-input');
const messageError = wrapper.find('.error');
const validateUsername = wrapper.vm.validateUsername;

describe('HomePage.vue', () => {
  it("testing GameView is visible", async () => {
    expect(wrapper.isVisible()).toBe(true);
    expect(input.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
  });

  it('should return false and set an error message for a username with length less than 3', async () => {
    const invalidUsername = 'ab';
    const result = validateUsername(invalidUsername);
    expect(result).toBe(false);
    await wrapper.vm.$nextTick();
    expect(messageError.text()).toBe('El usuario debe tener una longitud entre 3 y 16');    
  });

  it('should return false and set an error message for a username with length greater than 16', async () => {
    const invalidUsername = 'thisUsernameIsTooLong';
    const result = validateUsername(invalidUsername);
    expect(result).toBe(false);
    await wrapper.vm.$nextTick();
    expect(messageError.text()).toBe('El usuario debe tener una longitud entre 3 y 16');  
  });

  it('should return false and set an error message for a username containing non-alphabet characters', async () => {
    const invalidUsername = 'JohnDoe123';
    const result = validateUsername(invalidUsername);
    expect(result).toBe(false);
    await wrapper.vm.$nextTick();
    expect(messageError.text()).toBe('El usuario solo debe contener letras');    
  });
});