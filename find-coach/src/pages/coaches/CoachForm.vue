<template>
  <form @submit.prevent="submitForm">
    <div
      class="form-control"
      :class="{ invalid: !formFields.firstName.isValid }"
    >
      <label for="first-name">First Name</label>
      <input
        type="text"
        id="first-name"
        v-model.trim="formFields.firstName.val"
      />
      <p v-if="!formFields.firstName.isValid">FirstName must not be empty.</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !formFields.lastName.isValid }"
    >
      <label for="last-name">Last Name</label>
      <input
        type="text"
        id="last-name"
        v-model.trim="formFields.lastName.val"
      />
      <p v-if="!formFields.lastName.isValid">LastName must not be empty.</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !formFields.description.isValid }"
    >
      <label for="description">Description</label>
      <textarea
        rows="5"
        id="description"
        v-model="formFields.description.val"
      />
      <p v-if="!formFields.description.isValid">
        Description must not be empty.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !formFields.rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="formFields.rate.val" />
      <p v-if="!formFields.rate.isValid">Rate must be greater then 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !formFields.areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="formFields.areas.val"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="formFields.areas.val"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="formFields.areas.val"
        />
        <label for="frontend">Career Advisory</label>
      </div>
      <p v-if="!formFields.areas.isValid">
        At least one expertise must be selected.
      </p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton';
export default {
  emits: ['save-data'],
  components: { BaseButton },
  data() {
    return {
      formFields: {
        firstName: {
          val: '',
          isValid: true,
        },
        lastName: {
          val: '',
          isValid: true,
        },
        description: {
          val: '',
          isValid: true,
        },
        rate: {
          val: null,
          isValid: true,
        },
        areas: {
          val: [],
          isValid: true,
        },
      },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      let states = [];
      Object.keys(this.formFields).forEach((field) => {
        let isValid;
        if (field === 'areas' && this.formFields[field].val.length === 0) {
          isValid = false;
        } else if (
          field === 'rate' &&
          !this.formFields[field].val &&
          this.formFields[field].val < 0
        ) {
          isValid = false;
        } else {
          isValid = !!this.formFields[field].val;
        }
        this.formFields[field].isValid = isValid;
        states.push(isValid);
      });
      this.formIsValid = states.every((s) => s);
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        throw Error('Invalid Form Data');
      }
      console.log(this.formFields);
      const {
        firstName,
        lastName,
        description,
        areas,
        rate: hourlyRate,
      } = this.formFields;
      const formData = {
        firstName: firstName.val,
        lastName: lastName.val,
        description: description.val,
        hourlyRate: hourlyRate.val,
        areas: areas.val,
      };
      console.log(formData);
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
