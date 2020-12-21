<template>
  <a-spin :spinning="loading">
  <section class="bg-client">
		<div class="profile-cover text-center">
	    <img class="img-fluid" src="/images/company-profile.jpg" alt="">
	  </div>

	  <div class="bg-white shadow-sm border-bottom">
	  	<div class="container">
	  		<div class="row">
	  			<div class="col-md-12">
	  				<div class="d-flex align-items-center py-3">
	  					<div class="profile-left">
	  						<h5 class="font-weight-bold text-dark mb-1 mt-0">{{ (user != null && user.profile != null && user.profile.name != null) ? user.profile.name : ""}} 
	  							<span class="text-info">
	  								<i data-toggle="tooltip" data-placement="top" title="Verified" class="feather-check-circle"></i>
	  							</span>
	  						</h5>
	  						<p class="mb-0 text-muted"> Internet | Mountain View, CA | 14,128,005 followers</p>
	  					</div>
	  					<div class="profile-right ml-auto">
	  						<a target="_blank" :href="(user != null && user.profile != null && user.profile.pageURL != null) ? user.profile.pageURL : ''" type="button" class="btn btn-light mr-2">
	  							<i class="feather-external-link"></i> Visit website 
	  						</a>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	  </div>

	  <div class="pb-4 pt-3">
		  <div class="container">
			  <div class="row">
				  <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
				  	<div class="box shadow-sm rounded bg-white mb-3 overflow-hidden">
				  		<ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
				  			<li class="nav-item">
				  				<nuxt-link :to="'/home'" class="nav-link active" role="tab">About</nuxt-link>
				  			</li>

				  			<li class="nav-item">
				  				<nuxt-link :to="'/home/job'" class="nav-link" role="tab">Jobs</nuxt-link>
				  			</li>
				  		</ul>
				  	</div>

				  	<div class="tab-content" id="myTabContent">
						  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
							  <div class="box shadow-sm border rounded bg-white mb-3">
							  	<div class="box-title border-bottom p-3">
							  		<h6 class="m-0">About</h6>
							  	</div>

							  	<div v-if="user != null && user.profile != null && user.profile.introduction != null" class="box-body p-3">
							  		{{ user.profile.introduction }}
							  	</div>

                  <div v-else class="box-body p-3">
							  		<button type="button" class="btn btn-secondary w-100">
                      Add Introduction
                    </button>
							  	</div>
							  </div>

							  <div class="box shadow-sm border rounded bg-white mb-3">
							  	<div class="box-title border-bottom p-3">
							  		<h6 class="m-0">Overview</h6>
							  	</div>

							  	<div class="box-body">
							  		<table class="table table-borderless mb-0">
							  			<tbody>
							  				<tr class="border-bottom">
							  					<th class="p-3">Website</th>
							  					<td  class="p-3">
							  						<template v-if="user != null && user.profile != null && user.profile.pageURL != null">
                              <a :href="user.profile.pageURL">{{ user.profile.pageURL }}</a>
                            </template>

                            <button v-else type="button" class="btn btn-light w-100 d-flex align-items-center">
                              <a-icon class="mr-2" type="plus" /> Add Website
                            </button>
							  					</td>
							  				</tr>
							  				<tr class="border-bottom">
							  					<th class="p-3">Phone</th>
							  					<td class="p-3">
                            <template v-if="user != null && user.profile != null && user.profile.phone != null">
                              {{ user.profile.phone }}
                            </template>

                            <button v-else type="button" class="btn btn-light w-100 d-flex align-items-center">
                              <a-icon class="mr-2" type="plus" /> Add Phone
                            </button>
                          </td>
							  				</tr>

                        <tr class="border-bottom">
							  					<th class="p-3">City</th>
							  					<td class="p-3">
                            <template v-if="user != null && user.profile != null && user.profile.city != null">
                              {{ user.profile.city }}
                            </template>

                            <button v-else type="button" class="btn btn-light w-100 d-flex align-items-center">
                              <a-icon class="mr-2" type="plus" /> Add City
                            </button>
                          </td>
							  				</tr>
							  			</tbody>
							  		</table>
							  	</div>
							  </div>

							  <div class="box shadow-sm border rounded bg-white mb-3">
							  	<div class="box-title border-bottom p-3">
							  		<h6 class="m-0">Locations</h6>
							  	</div>
							  	<div class="p-3">
							  		<div class="row">
							  			<div class="col-md-6">
							  				<div class="card overflow-hidden">
							  					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501889.172354371!2d73.15671299623955!3d31.003573085499198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964aa569e7355%3A0x8fbd263103a38861!2sPunjab!5e0!3m2!1sen!2sin!4v1575738201305!5m2!1sen!2sin" width="100%" height="150" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
							  					<div class="card-body">
							  						<h6 class="card-title">Postal Address</h6>
							  						<p class="card-text">PO Box 16122 Collins Street West Victoria 8007 Australia</p>
							  						<a href="#" class="text-link font-weight-bold">
							  							<i class="feather-external-link"></i> Get Directions
							  						</a>
							  					</div>
							  				</div>
							  			</div>

							  			<div class="col-md-6">
							  				<div class="card overflow-hidden">
							  					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109552.19658166621!2d75.78663235513761!3d30.900473637624447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348ec60610!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1575738867148!5m2!1sen!2sin" width="100%" height="150" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
							  					<div class="card-body">
							  						<h6 class="card-title">Envato HQ</h6>
							  						<p class="card-text">121 King Street, Melbourne Victoria 3000 Australia</p>
							  						<a href="#" class="text-link font-weight-bold">
							  							<i class="feather-external-link"></i> Get Directions
							  						</a>
							  					</div>
							  				</div>
							  			</div>
							  		</div>
							  	</div>
							  </div>
						  </div>
				  	</div>
				  </main>

				  <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
				  	<div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
				  		<div class="p-5">
				  			<template v-if="user != null && user.profile != null && user.profile.profileUrl != null">
                  <img :src="user.profile.profileUrl" class="img-fluid" alt="Responsive image">
                </template>
                <template v-else>
                  <img src="/images/clogo.png" class="img-fluid" alt="Responsive image">
                </template>
				  		</div>

				  		<div class="p-3 border-top border-bottom">
				  			<h6 class="font-weight-bold text-dark mb-1 mt-0">Overview</h6>
				  			<p class="mb-0 text-muted">Google’s mission is to organize the world‘s information and make it universally accessible and useful.</p>
				  		</div>

				  		<div class="p-3">
				  			<div class="d-flex align-items-top mb-2">
				  				<p class="mb-0 text-dark font-weight-bold">Common Connections</p>
				  				<p class="font-weight-bold text-info mb-0 mt-0 ml-auto">358</p>
				  			</div>
				  			<div class="d-flex align-items-top">
				  				<p class="mb-0 text-dark font-weight-bold">All Employees</p>
				  				<p class="font-weight-bold text-info mb-0 mt-0 ml-auto">191,895</p>
				  			</div>
				  		</div>
				  	</div>
				  </aside>

				  <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
				  	<div class="box shadow-sm border rounded bg-white mb-3">
				  		<div class="box-title border-bottom p-3">
				  			<h6 class="m-0">POST</h6>
				  		</div>
              <img src="/images/job1.png" class="img-fluid" alt="Responsive image">
				  		<div class="p-3 border-bottom">
				  			<h6 class="font-weight-bold text-dark">Osahan Solutions</h6>
				  			<p class="mb-0 text-muted">Looking for talent?</p>
				  		</div>

				  		<div class="p-3">
				  			<button type="button" class="btn btn-outline-primary pl-4 pr-4"> POST A JOB </button>
				  		</div>
				  	</div>
				  </aside>
				</div>
			</div>
	  </div>
	</section>
  </a-spin>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url('./style.scss');
.gray-bg {
    float: left;
    width: 100%;
    background: $colorPurple;
}
</style>