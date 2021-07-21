<template>
    <li class="nav-item dropdown" ref="dropdown">
        <button class="nav-link" data-toggle="dropdown" @click="toggleDropdown">
            <i class="flag-icon flag-icon-us"></i>
        </button>
        <div
            class="dropdown-menu dropdown-menu-right p-0"
            :class="{show: isDropdownOpened}"
        >
            <a href="#" class="dropdown-item active">
                <i class="flag-icon flag-icon-us mr-2"></i> English
            </a>
            <a href="#" class="dropdown-item">
                <i class="flag-icon flag-icon-de mr-2"></i> German
            </a>
            <a href="#" class="dropdown-item">
                <i class="flag-icon flag-icon-fr mr-2"></i> French
            </a>
            <a href="#" class="dropdown-item">
                <i class="flag-icon flag-icon-es mr-2"></i> Spanish
            </a>
        </div>
    </li>
</template>
<script>
import {defineComponent} from '@vue/runtime-core';

export default defineComponent({
    data() {
        return {
            isDropdownOpened: false
        };
    },
    mounted(){
        document.addEventListener('click', this.documentClick);
    },
    unmounted() {
        document.removeEventListener('click', this.documentClick);
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpened = !this.isDropdownOpened;
        },
        documentClick(event) {
            const el = this.$refs.dropdown;
            const target = event.target;
            if (el !== target && !el.contains(target)) {
                this.isDropdownOpened = false;
            }
        }
    }
});
</script>
<style></style>
