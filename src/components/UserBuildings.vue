<template>
  <div id="user_building__template">
    <!-- START USER SELECTION -->

    <section>
      <select v-model="userSelected">
        <option :value="null">Select User</option>
        <option
          :value="user.id"
          v-for="user of store.state.users"
          :key="user.id"
        >
          {{ user.name }}
        </option>
      </select>
    </section>

    <Alert v-if="!userSelected" title="Please select a user." />

    <!-- END USER SELECTION -->

    <div v-else id="users_building__container">
      <!-- USER BUILDING LIST -->

      <BuildingsList />

      <div class="right-side">
        <!-- FORM FOR BUILDING -->

        <AddBuildingForm v-if="store.state.showForm" />

        <!-- MAP COMPONENT -->

        <MapView
          v-else-if="
            !store.state.showForm && store.state.userBuildings.length > 0
          "
        />

        <Alert v-else title="This user doesn't have any buildings yet" />
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, watch } from "vue";
import BuildingsList from "./BuildingsList";
import MapView from "./MapView.vue";
import Alert from "./UI/Alert";
import AddBuildingForm from "./AddBuildingForm.vue";

export default {
  components: {
    BuildingsList,
    Alert,
    MapView,
    AddBuildingForm,
  },
  setup() {
    const store = inject("store");
    const userSelected = ref(null);

    // WATCHER FOR THE SELECTED USER TO GET THE BUILDINGS OF THE DATA.

    watch(userSelected, (userSelected) => {
      store.methods.setSelectedUser(userSelected);
      store.methods.getUserBuildings(userSelected);
    });

    return {
      store,
      userSelected,
    };
  },
};
</script>

<style scoped>
#user_building__template {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 100%;
}

select {
  width: 200px;
  padding: 10px;
  border-radius: 10px;
}

#users_building__container {
  display: flex;
  flex-direction: column-reverse;
  margin-top: 20px;
  padding: 10px;
  max-width: 100%;
}

.right-side {
  margin-bottom: 10px;
}

@media screen and (min-width: 992px) {
  .right-side {
    margin-bottom: 0;
    width: 70%;
    margin-left: 10px;
  }

  #users_building__container {
    flex-direction: row;
  }

  #user_building__template {
    width: 970px;
  }
}

@media (min-width: 768px) {
  #user_building__template {
    width: 750px;
  }
}
@media (min-width: 1200px) {
  #user_building__template {
    width: 1170px;
  }
}
</style>
