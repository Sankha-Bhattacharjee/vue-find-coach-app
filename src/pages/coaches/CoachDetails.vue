<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Intrested?Reach out Now!</h2>
          <base-button link :to="contactLink" :mode="disableMode">Contact</base-button>
        </header>
        <router-view @disable-button="disableButton"></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCustomer: null,
      isDisable:false,
      disableMode:null,
    };
  },
  computed: {
    fullName() {
      return (
        this.selectedCustomer.firstName + ' ' + this.selectedCustomer.lastName
      );
    },
    rate() {
      return this.selectedCustomer.hourlyRate;
    },
    areas() {
      return this.selectedCustomer.areas;
    },
    description() {
      return this.selectedCustomer.description;
    },
    contactLink() {
      return this.isDisable ? '': this.$route.path + '/contact';
    },
  },
  created() {
    this.selectedCustomer = this.$store.getters['coaches/getCoaches'].find(
      (coach) => coach.id === this.id
    );
  },
  methods:{
    disableButton(value){
      this.isDisable = value;
      this.disableMode = 'inactive';
    }
  }
};
</script>
