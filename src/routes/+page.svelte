<script lang="ts">
  import { onMount } from "svelte";
  import CarService from "$services/CarService";
  import DriverService from "$/lib/services/DriverService";
  import { LicenceCategory } from "$/lib/types/DriverTypes";
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

    const driverService = DriverService.getInstance();
    // driverService.getDrivers();
    // driverService.createDriver({
    //   address: "11 e/ 198 y 200 #19802, Siboney",
    //   category: LicenceCategory.C,
    //   name: "Carlos D.",
    //   id_number: "01060568481",
    // });
    // driverService.updateDriver('01060568481',{
    //   address: "11 e/ 198 y 200 #19802, Siboney",
    //   category: LicenceCategory.A,
    //   name: "Carlos Daniel",
    //   id_number: "01060568482",
    // });
    // await driverService.setDriverCar("01060568482", "5");
    // await driverService.getDriverCar("01060568482");
    // driverService.removeDriverCar("01060568482");
  });
</script>
