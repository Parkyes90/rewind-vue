<template>
  <div>
    <base-dialog :show="!!error" title="An Error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">EMail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long),
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>
<script>
import BaseButton from '@/components/ui/BaseButton';
import BaseCard from '@/components/ui/BaseCard';
import { AUTH_MODE } from '@/constants/auth';
import BaseDialog from '@/components/ui/BaseDialog';
import BaseSpinner from '@/components/ui/BaseSpinner';
export default {
  components: { BaseDialog, BaseCard, BaseButton, BaseSpinner },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: AUTH_MODE.LOGIN.value,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return AUTH_MODE[this.mode].caption;
    },
    switchModeButtonCaption() {
      return this.mode === AUTH_MODE.LOGIN.value
        ? `${AUTH_MODE.SIGN_UP.caption} Instead`
        : `${AUTH_MODE.LOGIN.caption} Instead`;
    },
  },
  methods: {
    handleError() {
      this.error = null;
    },
    validateForm() {
      if (
        !this.email ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.isLoading = true;
      this.validateForm();
      if (this.formIsValid) {
        try {
          const payload = {
            email: this.email,
            password: this.password,
          };
          if (this.mode === AUTH_MODE.LOGIN.value) {
            await this.$store.dispatch('login', payload);
          } else {
            await this.$store.dispatch('signUp', payload);
          }
        } catch (e) {
          this.error = e.message || 'Failed to authenticate, try later.';
        }
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === AUTH_MODE.LOGIN.value) {
        this.mode = AUTH_MODE.SIGN_UP.value;
      } else {
        this.mode = AUTH_MODE.LOGIN.value;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
