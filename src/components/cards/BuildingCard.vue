<template>
  <div class="building_card">
    <span>{{ building.name }}</span>
    <div class="buttons_section">
      <button @click.stop="editBuilding" class="edit_btn">Edit</button>
      <button @click.stop="deleteBuilding" class="delete_btn">Delete</button>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  props: {
    building: {
      type: Object,
    },
  },
  setup(props) {
    const store = inject("store");

    function deleteBuilding() {
      store.methods.deleteBuilding(props.building.id);
    }

    function editBuilding() {
      store.methods.setEditMode(true);
      store.methods.setShowForm(true);
      store.methods.setBuildingToBeUpdated(props.building);
    }

    return {
      deleteBuilding,
      editBuilding,
    };
  },
};
</script>

<style scoped>
.building_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  color: white;
  margin-bottom: 10px;
  background-color: sandybrown;
  cursor: pointer;
}

.building_card:hover {
  background-color: coral;
}

button {
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-inline: 5px;
  font-weight: 600;
  cursor: pointer;
}

.edit_btn {
  background-color: greenyellow;
  color: #555;
}

.edit_btn:hover {
  background-color: lightgreen;
}

.delete_btn {
  background-color: red;
  color: white;
}

.delete_btn:hover {
  background-color: crimson;
}
</style>
