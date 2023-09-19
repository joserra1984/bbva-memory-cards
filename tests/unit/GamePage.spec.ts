import { mount } from '@vue/test-utils'
import { it, expect, beforeEach, describe } from 'vitest'
import HomePage from '@/views/GamePage.vue';
import levels from '@/assets/levels.json';
import { Level } from '@/interfaces/interfaces.ts';

const wrapper = mount(HomePage);

const restartCommon = (wrapper) => {
    expect(wrapper.vm.death).toBe(false);
    expect(wrapper.vm.timeLeft).toBe(wrapper.vm.selectedLevel.time);
    expect(wrapper.vm.userSelection).toBe(-1);
}

describe('GamePage.vue', () => {
    it("testing GameView is visible",  () => {
        expect(wrapper.isVisible()).toBe(true);
    });
    it('Testing generateRandomNumber is from 1 to 9', async () => {
        expect(wrapper.vm.generateRandomNumber()).above(0).and.below(10);
    });
    it('Testing refreshRandomArray method', () => {
        const result = wrapper.vm.refreshRandomArray()
        expect(result).toHaveLength(9);
        const uniqueValues = new Set(result);
        expect(uniqueValues.size).toBe(result.length);
    });
    it('Testing restart method',  () => {
        wrapper.vm.restart(20);
        restartCommon(wrapper);
        expect(wrapper.vm.points).toBe(20);
        wrapper.vm.restart();
        restartCommon(wrapper);
        expect(wrapper.vm.points).toBe(0);
    });
    it('Testing handleSelection method OK',  () => {
        const oldPoints = wrapper.vm.points;
        wrapper.vm.handleSelection(wrapper.vm.userSelection);
        expect(wrapper.vm.points - oldPoints === wrapper.vm.selectedLevel.points);
        expect(wrapper.vm.timeLeft).toBe(wrapper.vm.selectedLevel.time);
        expect(wrapper.vm.userSelection).toBe(-1);
    });
});