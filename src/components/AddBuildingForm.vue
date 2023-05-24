<template>
  <form @submit.prevent="submitHandler">
    <div class="form-control">
      <label for="name">Name</label>
      <input type="text" v-model="name" placeholder="Name" />
    </div>

    <!-- SHOW ERROR IF NAME IS EMPTY -->

    <span v-if="nameError" class="error">This field can not be empty</span>

    <div class="form-control">
      <label for="name">Country</label>
      <select v-model="country">
        <option :value="null">Select a country</option>
        <option
          v-for="country of countryList"
          :key="country.id"
          :value="country.id"
        >
          {{ country.name }}
        </option>
      </select>
    </div>

    <!-- SHOW ERROR IF COUNTRY IS NULL -->

    <span v-if="countryError" class="error">This field can not be empty</span>
    <button class="submit_btn" type="submit">Submit</button>
  </form>
</template>

<script>
import { ref, inject, watch } from "vue";

import countries from "../common/countriesList.json";

export default {
  setup() {
    const countryList = ref(countries);

    const name = ref("");
    const nameError = ref(false);

    const country = ref(null);
    const countryError = ref(false);

    const store = inject("store");
    const buildingToBeUpdated = store.state.buildingToBeUpdated;

    if (buildingToBeUpdated) {
      name.value = buildingToBeUpdated.name;
      country.value = buildingToBeUpdated.country;
    }

    // WATCHER FOR BUILDING THAT WILL BE UPDATED

    watch(
      () => store.state.buildingToBeUpdated,
      (newVal) => {
        name.value ? (name.value = newVal.name) : null;
        country.value ? (country.value = newVal.country) : null;
      },
      { deep: true }
    );

    // WATCHER FOR THE EDIT MODE IN CASE WE NEED TO TRANSFER FRON EDIT MODE TO ADD MODE

    watch(
      () => store.state.editMode,
      (newVal) => {
        if (newVal === false) {
          store.methods.setBuildingToBeUpdated(null);
          name.value = "";
          country.value = null;
        }
      }
    );

    // SUBMIT HANDLER FOR THE FORM

    function submitHandler() {
      if (name.value.trim().length === 0 || country.value === null) {
        name.value.trim().length === 0
          ? (nameError.value = true)
          : (nameError.value = false);
        country.value === null
          ? (countryError.value = true)
          : (countryError.value = false);

        return;
      }

      const data = {
        userId: store.state.selectedUser,
        name: name.value,
        country: country.value,
      };

      if (store.state.buildingToBeUpdated) {
        store.methods.updateBuilding(data);
      } else {
        store.methods.addBuilding(data);
      }

      name.value = "";
      country.value = null;
    }

    return {
      countryList,
      name,
      country,
      nameError,
      countryError,
      submitHandler,
    };
  },
};
</script>

<style scoped>
form {
  border: 1px solid lightgray;
  padding: 15px;
  border-radius: 10px;
  max-width: 100%;
  height: fit-content;
}

.form-control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 12px;
}

label {
  font-size: 16px;
  font-weight: 500;
  color: lightcoral;
  width: 10%;
  margin-bottom: 10px;
  text-align: start;
}

input,
select {
  border: 2px solid lightcoral;
  padding: 10px;
  margin-left: 0;
  color: #555;
  border-radius: 10px;
  width: 200px;
  width: 90%;
}

.submit_btn {
  background-color: lightcoral;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  width: 200px;
  font-size: 16px;
  cursor: pointer;
}

.submit_btn:hover {
  background-color: coral;
}

.error {
  color: white;
  font-style: italic;
  font-weight: 600;
  font-size: 12px;
  display: block;
  margin-bottom: 10px;
  text-align: start;
  background-color: brown;
}

@media screen and (min-width: 992px) {
  form {
    width: 100%;
    /* margin-left: 10px; */
  }
  .form-control {
    flex-direction: row;
  }

  input,
  select {
    margin-left: 20px;
  }

  label {
    margin-bottom: 0;
  }
}
</style>
