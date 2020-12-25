<template>
  <main class="col order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
    <a-select @change="changeJob" class="w-100 mb-3" size="large" default-value="all">
      <a-select-option value="all">
        ALL JOB
      </a-select-option>
      <a-select-option v-for="(item, index) in listJob" :key="index" :value="item.id">
        {{ item.name }}
      </a-select-option>
    </a-select>

	  <div  class="box shadow-sm border rounded bg-white mb-3">
		  <div class="box-title border-bottom p-3">
		  	<h6 class="m-0">List Application</h6>
		  </div>

		  <div v-for="(item, index) in application" :key="index" class="box-body p-0">
			  <div v-if="item.profile != null" class="p-3 d-flex align-items-center border-bottom osahan-post-header row">
				  <div class="col-8 d-flex">
            <a-avatar class="mr-3" size="large" :src="item.profile.profileUrl" />
				    <div class="font-weight-bold mr-3">
					    <div class="text-truncate">{{ item.profile.name }}</div>
					    <div class="small">{{ item.email }}</div>
				    </div>
          </div>

				  <div class="col-4 text-left d-flex flex-column">
				    <div class="d-flex justify-content-end">
              <a-button @click="accept(item)" style="background-color: #30AB4A" class="text-white mr-2">
                <a-icon type="check" />
              </a-button>

              <a-button @click="reject(item)" class="" type="danger">
                <a-icon type="close" />
              </a-button>
            </div>
					  <div class="text-right">3d</div>
          </div>
				</div>
			</div>
		</div>
 <!-- v-if="application.length > 0" -->
    <!-- <div v-else class="box shadow-sm border rounded bg-white mb-3">
      <div class="box-title border-bottom p-3">
		  	<h6 class="m-0">List Application</h6>
		  </div>

      <div class="box-body p-0">
        <div class="p-3 d-flex align-items-center border-bottom osahan-post-header">
          No application
        </div>
      </div>
    </div> -->
	</main>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>