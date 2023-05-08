<script lang="ts">
  import { onMount } from "svelte";
  import CarService from "$services/CarService";
  onMount(async () => {
    const carService = CarService.getInstance();
    // await carService.getCars();
    // await carService.getCar("LB1CM");
    // await carService.createCar({
    //   plate_number: "GRWSG",
    //   brand: "Tesla",
    //   seat_amount: 4,
    //   available_km: 600,
    // });
    // await carService.deleteCar("GRWSG")
    // await carService.updateCar("AFG1K", {
    //   available_km: 900,
    //   plate_number: "GRWSG",
    //   seat_amount: 5,
    // });
  });
</script>
