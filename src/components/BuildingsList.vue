<template>
  <div id="building_list__container">
    <h2>User's building</h2>

    <!-- START LOADER -->

    <template
      v-if="store.state.loading && store.state.userBuildings.length <= 0"
    >
      <Loader />
    </template>

    <!-- END LOADER -->

    <!-- START USER BUILDINGS -->

    <template v-else>
      <div
        v-if="store.state.userBuildings.length > 0"
        class="user_buildings_list scrollbar scrollbar-accent"
      >
        <BuildingCard
          @click="selectBuilding(building)"
          v-for="building of store.state.userBuildings"
          :key="building.id"
          :building="building"
        />
      </div>
      <Alert v-else title="User Building List is Empty." />

      <!-- ADD BUTTON FOR SHOWING FORM -->

      <button class="add_building__btn" @click="showBuildingForm">
        Add Building
      </button>
    </template>

    <!-- END USER BUILDINS -->
  </div>
</template>

<script>
import Loader from "./UI/Loader.vue";
import Alert from "./UI/Alert.vue";
import { inject } from "vue";
import BuildingCard from "./cards/BuildingCard.vue";

export default {
  components: { Loader, Alert, BuildingCard },
  setup() {
    const store = inject("store");

    function showBuildingForm() {
      store.methods.setEditMode(false);
      store.methods.setShowForm(true);
    }

    function selectBuilding(building) {
      if (store.state.showForm) {
        store.methods.setShowForm(false);
      }
      store.methods.setSelectedBuilding(building);
    }

    return {
      store,
      showBuildingForm,
      selectBuilding,
    };
  },
};
</script>

<style scoped>
#building_list__container {
  max-width: 100%;
  border: 2px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: space-between;
}

h2 {
  font-size: 16px;
  text-align: center;
  background-color: lightgoldenrodyellow;
  padding: 12px;
}
.add_building__btn {
  background-color: bisque;
  padding: 10px;
  width: 100%;
  display: block;
  margin-top: auto;
  color: #555;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.add_building__btn:hover {
  background-color: darkorange;
}

.user_buildings_list {
  overflow-y: auto;
  overflow-x: hidden;
  height: 80%;
}

@media screen and (min-width: 992px) {
  #building_list__container {
    width: calc(30% - 10px);
  }
}
</style>
