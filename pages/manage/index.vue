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

	  <div class="box shadow-sm border rounded bg-white mb-3">
		  <div class="box-title border-bottom p-3">
		  	<h6 class="m-0">List Application</h6>
		  </div>

		  <div class="box-body p-0">
			  <div class="p-3 d-flex align-items-center border-bottom osahan-post-header">
				  <div class="dropdown-list-image mr-3 d-flex align-items-center bg-danger justify-content-center rounded-circle text-white">DRM</div>

				  <div class="font-weight-bold mr-3">
					  <div class="text-truncate">DAILY RUNDOWN: MONDAY</div>
					  <div class="small">Nunc purus metus, aliquam vitae venenatis sit amet, porta non est. </div>
				  </div>

				  <span class="ml-auto mb-auto">
				    <a-dropdown>
              <a-icon :style="{ fontSize: '18px', fontWeight: 'bold' }" type="more" />
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <nuxt-link :to="`/home/job`" class="d-flex align-items-center"><a-icon class="mr-2" type="eye" />View</nuxt-link>
                </a-menu-item>
                <a-menu-item key="1">
                  <a @click="acceptApplication()" class="d-flex align-items-center"><a-icon class="mr-2" type="edit" />Accept</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a @click="rejectApplication()" class="d-flex align-items-center"><a-icon class="mr-2" type="delete" />Reject</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
					  <br>
						<div class="text-right text-muted pt-1">3d</div>
					</span>
				</div>
			</div>
		</div>
	</main>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>