<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-300 border-radius-xl"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
        backgroundPositionY: '50%',
      }"
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
              src="@/assets/img/profile.jpg"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{admin.username}}</h5>
            <p class="mb-0 text-sm font-weight-bold">{{admin.role}}</p>
          </div>
        </div>
        <div class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-3 row">
<!--      <div class="col-12 col-md-6 col-xl-4">-->
<!--        <div class="card h-100">-->
<!--          <div class="p-3 pb-0 card-header">-->
<!--            <h6 class="mb-0">Platform Settings</h6>-->
<!--          </div>-->
<!--          <div class="p-3 card-body">-->
<!--            <h6 class="text-xs text-uppercase text-body font-weight-bolder">-->
<!--              Account-->
<!--            </h6>-->
<!--            <ul class="list-group">-->
<!--              <li class="px-0 border-0 list-group-item">-->
<!--                <vsud-switch-->
<!--                  id="flexSwitchCheckDefault"-->
<!--                  name="email"-->
<!--                  class="ps-0 ms-auto"-->
<!--                  label-class="mb-0 text-body ms-3 text-truncate w-80"-->
<!--                  checked-->
<!--                  >Email me when someone follows me</vsud-switch-->
<!--                >-->
<!--              </li>-->
<!--              <li class="px-0 border-0 list-group-item">-->
<!--                <vsud-switch-->
<!--                  id="flexSwitchCheckDefault1"-->
<!--                  name="Email"-->
<!--                  label-class="mb-0 text-body ms-3 text-truncate w-80"-->
<!--                  class="ps-0 ms-auto"-->
<!--                  >Email me when someone answers on my post</vsud-switch-->
<!--                >-->
<!--              </li>-->

<!--              <li class="px-0 border-0 list-group-item">-->
<!--                <vsud-switch-->
<!--                  id="flexSwitchCheckDefault2"-->
<!--                  name="Email"-->
<!--                  label-class="mb-0 text-body ms-3 text-truncate w-80"-->
<!--                  class="ps-0 ms-auto"-->
<!--                  checked-->
<!--                  >Email me when someone mentions me</vsud-switch-->
<!--                >-->
<!--              </li>-->
<!--            </ul>-->
<!--            <h6-->
<!--              class="mt-4 text-xs text-uppercase text-body font-weight-bolder"-->
<!--            >-->
<!--              Application-->
<!--            </h6>-->
<!--            <ul class="list-group">-->
<!--              <li class="px-0 border-0 list-group-item">-->
<!--                <vsud-switch-->
<!--                  id="flexSwitchCheckDefault3"-->
<!--                  name="Project Launch"-->
<!--                  class="ps-0 ms-auto"-->
<!--                  label-class="mb-0 text-body ms-3 text-truncate w-80"-->
<!--                  >New launches and projects</vsud-switch-->
<!--                >-->
<!--              </li>-->
<!--              <li class="px-0 border-0 list-group-item">-->
<!--                <vsud-switch-->
<!--                  id="flexSwitchCheckDefault4"-->
<!--                  name="Product Update"-->
<!--                  class="ps-0 ms-auto"-->
<!--                  label-class="mb-0 text-body ms-3 text-truncate w-80"-->
<!--                  checked-->
<!--                  >Monthly product updates</vsud-switch-->
<!--                >-->
<!--              </li>-->
<!--              <li class="px-0 pb-0 border-0 list-group-item">-->
<!--                <vsud-switch-->
<!--                  id="flexSwitchCheckDefault5"-->
<!--                  name="Newsletter"-->
<!--                  class="ps-0 ms-auto"-->
<!--                  label-class="mb-0 text-body ms-3 text-truncate w-80"-->
<!--                  >Subscribe to newsletter</vsud-switch-->
<!--                >-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="mt-4 col-12 mt-md-0">
        <profile-info-card
          :title="`  پروفایل ${admin.role}`"
          :info="{
            username:admin.username,
            phone_number:admin.phone_number,
            email: admin.email,
            address: admin.address,
          }"
          :role="{
            title: admin.role,
          }"
        />
      </div>
<!--      <div class="mt-4 col-12 col-xl-4 mt-xl-0">-->
<!--        <div class="card h-100">-->
<!--          <div class="p-3 pb-0 card-header">-->
<!--            <h6 class="mb-0">Conversations</h6>-->
<!--          </div>-->
<!--          <div class="p-3 card-body">-->
<!--            <ul class="list-group">-->
<!--              <li-->
<!--                class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"-->
<!--              >-->
<!--                <vsud-avatar-->
<!--                  class="me-3"-->
<!--                  :img="sophie"-->
<!--                  alt="kal"-->
<!--                  border-radius="lg"-->
<!--                  shadow="regular"-->
<!--                />-->
<!--                <div-->
<!--                  class="d-flex align-items-start flex-column justify-content-center"-->
<!--                >-->
<!--                  <h6 class="mb-0 text-sm">Sophie B.</h6>-->
<!--                  <p class="mb-0 text-xs">Hi! I need more information..</p>-->
<!--                </div>-->
<!--                <a-->
<!--                  class="mb-0 btn btn-link pe-3 ps-0 ms-auto"-->
<!--                  href="javascript:;"-->
<!--                  >Reply</a-->
<!--                >-->
<!--              </li>-->
<!--              <li-->
<!--                class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"-->
<!--              >-->
<!--                <vsud-avatar-->
<!--                  class="me-3"-->
<!--                  :img="marie"-->
<!--                  alt="kal"-->
<!--                  border-radius="lg"-->
<!--                  shadow="regular"-->
<!--                />-->
<!--                <div-->
<!--                  class="d-flex align-items-start flex-column justify-content-center"-->
<!--                >-->
<!--                  <h6 class="mb-0 text-sm">Anne Marie</h6>-->
<!--                  <p class="mb-0 text-xs">Awesome work, can you..</p>-->
<!--                </div>-->
<!--                <a-->
<!--                  class="mb-0 btn btn-link pe-3 ps-0 ms-auto"-->
<!--                  href="javascript:;"-->
<!--                  >Reply</a-->
<!--                >-->
<!--              </li>-->
<!--              <li-->
<!--                class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"-->
<!--              >-->
<!--                <vsud-avatar-->
<!--                  class="me-3"-->
<!--                  :img="ivana"-->
<!--                  alt="kal"-->
<!--                  border-radius="lg"-->
<!--                  shadow="regular"-->
<!--                />-->
<!--                <div-->
<!--                  class="d-flex align-items-start flex-column justify-content-center"-->
<!--                >-->
<!--                  <h6 class="mb-0 text-sm">Ivanna</h6>-->
<!--                  <p class="mb-0 text-xs">About files I can..</p>-->
<!--                </div>-->
<!--                <a-->
<!--                  class="mb-0 btn btn-link pe-3 ps-0 ms-auto"-->
<!--                  href="javascript:;"-->
<!--                  >Reply</a-->
<!--                >-->
<!--              </li>-->
<!--              <li-->
<!--                class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"-->
<!--              >-->
<!--                <vsud-avatar-->
<!--                  class="me-3"-->
<!--                  :img="peterson"-->
<!--                  alt="kal"-->
<!--                  border-radius="lg"-->
<!--                  shadow="regular"-->
<!--                />-->
<!--                <div-->
<!--                  class="d-flex align-items-start flex-column justify-content-center"-->
<!--                >-->
<!--                  <h6 class="mb-0 text-sm">Peterson</h6>-->
<!--                  <p class="mb-0 text-xs">Have a great afternoon..</p>-->
<!--                </div>-->
<!--                <a-->
<!--                  class="mb-0 btn btn-link pe-3 ps-0 ms-auto"-->
<!--                  href="javascript:;"-->
<!--                  >Reply</a-->
<!--                >-->
<!--              </li>-->
<!--              <li-->
<!--                class="px-0 border-0 list-group-item d-flex align-items-center"-->
<!--              >-->
<!--                <vsud-avatar-->
<!--                  class="me-3"-->
<!--                  :img="nick"-->
<!--                  alt="kal"-->
<!--                  border-radius="lg"-->
<!--                  shadow="regular"-->
<!--                />-->
<!--                <div-->
<!--                  class="d-flex align-items-start flex-column justify-content-center"-->
<!--                >-->
<!--                  <h6 class="mb-0 text-sm">Nick Daniel</h6>-->
<!--                  <p class="mb-0 text-xs">Hi! I need more information..</p>-->
<!--                </div>-->
<!--                <a-->
<!--                  class="mb-0 btn btn-link pe-3 ps-0 ms-auto"-->
<!--                  href="javascript:;"-->
<!--                  >Reply</a-->
<!--                >-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
<!--    <div class="mt-4 row">-->
<!--      <div class="col-12">-->
<!--        <div class="mb-4 card">-->
<!--          <div class="p-3 pb-0 card-header">-->
<!--            <h6 class="mb-1">Projects</h6>-->
<!--            <p class="text-sm">Architects design houses</p>-->
<!--          </div>-->
<!--          <div class="p-3 card-body">-->
<!--            <div class="row">-->
<!--              <default-project-card-->
<!--                title="Modern"-->
<!--                :image="img1"-->
<!--                label="Project #2"-->
<!--                description="As Uber works through a huge amount of internal-->
<!--                management turmoil."-->
<!--                :authors="[-->
<!--                  {-->
<!--                    image: team1,-->
<!--                    name: 'Elena Morison',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team2,-->
<!--                    name: 'Ryan Milly',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team3,-->
<!--                    name: 'Nick Daniel',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team4,-->
<!--                    name: 'Peterson',-->
<!--                  },-->
<!--                ]"-->
<!--                :action="{-->
<!--                  color: 'success',-->
<!--                  label: 'View Project',-->
<!--                }"-->
<!--              />-->

<!--              <default-project-card-->
<!--                title="Scandinavian"-->
<!--                :image="img2"-->
<!--                label="Project #1"-->
<!--                description="Music is something that every person has his or her own-->
<!--                      specific opinion about."-->
<!--                :authors="[-->
<!--                  {-->
<!--                    image: team3,-->
<!--                    name: 'Nick Daniel',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team4,-->
<!--                    name: 'Peterson',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team1,-->
<!--                    name: 'Elena Morison',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team2,-->
<!--                    name: 'Ryan Milly',-->
<!--                  },-->
<!--                ]"-->
<!--                :action="{-->
<!--                  color: 'success',-->
<!--                  label: 'View Project',-->
<!--                }"-->
<!--              />-->

<!--              <default-project-card-->
<!--                title="Minimalist"-->
<!--                :image="img3"-->
<!--                label="Project #3"-->
<!--                description="Different people have different taste, and various types-->
<!--                      of music."-->
<!--                :authors="[-->
<!--                  {-->
<!--                    image: team4,-->
<!--                    name: 'Peterson',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team3,-->
<!--                    name: 'Nick Daniel',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team1,-->
<!--                    name: 'Elena Morison',-->
<!--                  },-->
<!--                  {-->
<!--                    image: team2,-->
<!--                    name: 'Ryan Milly',-->
<!--                  },-->
<!--                ]"-->
<!--                :action="{-->
<!--                  color: 'success',-->
<!--                  label: 'View Project',-->
<!--                }"-->
<!--              />-->

<!--              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">-->
<!--                <place-holder-card-->
<!--                  :title="{ text: 'New project', variant: 'h5' }"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import ProfileInfoCard from "./components/ProfileInfoCard.vue";

import {

} from "@fortawesome/free-brands-svg-icons";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "ProfileOverview",
  components: {
    ProfileInfoCard,
  },
  data() {
    return {
      showMenu: false,
      admin:{
        username:'',
        password:'',
        email:'',
        address:'',
        role:'',
        phone_number:''
      }
    };
  },

  mounted() {
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      const user = JSON.parse(localStorage.getItem('wugt'));
      this.admin.username = user.username;
      this.admin.password = user.password;
      this.admin.email = user.email;
      this.admin.address = user.address;
      this.admin.role = user.role.name;
      this.admin.phone_number = user.phone_number;
    }
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
