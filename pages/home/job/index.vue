<template>
  <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
		<div class="box shadow-sm rounded bg-white mb-3 overflow-hidden">
			<ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
				<li class="nav-item">
					<nuxt-link :to="'/home'" class="nav-link" role="tab">About</nuxt-link>
				</li>
				<li class="nav-item">
					<nuxt-link :to="'/home/job'" class="nav-link active" role="tab">Jobs</nuxt-link>
				</li>
			</ul>
		</div>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">
  	    <div class="box shadow-sm border rounded bg-white p-3">
  		    <div class="row">
  			    <div class="col-md-6">
  				    <a href="job-profile.html">
  					    <div class="border job-item mb-3">
  						    <div class="d-flex align-items-center p-3 job-item-header">
  							    <div class="overflow-hidden mr-2">
  							  	  <h6 class="font-weight-bold text-dark mb-0 text-truncate">UI/UX designer</h6>
  							  	  <div class="text-truncate text-primary">Envato</div>
  							  	  <div class="small text-gray-500">
  							  		  <i class="feather-map-pin"></i> India, Punjab
  							  	  </div>
  							    </div>
  							    <img class="img-fluid ml-auto" src="img/l1.png" alt="">
  					  	  </div>

  							  <div class="d-flex align-items-center p-3 border-top border-bottom job-item-body">
  							  	<div class="overlap-rounded-circle">
  								  	<img class="rounded-circle shadow-sm" src="/images/p1.png" alt="" data-original-title="Sophia Lee">
  										<img class="rounded-circle shadow-sm" src="/images/p2.png" alt="" data-original-title="John Doe">
  										<img class="rounded-circle shadow-sm" src="/images/p3.png" alt="" data-original-title="Julia Cox">
  										<img class="rounded-circle shadow-sm" src="/images/p4.png" alt="" data-original-title="Robert Cook">
  										<img class="rounded-circle shadow-sm" src="/images/p5.png" alt="" data-original-title="Sophia Lee">
  									</div>
  									<span class="font-weight-bold text-primary">18 connections</span>
  							  </div>

  								<div class="p-3 job-item-footer">
  									<small class="text-gray-500">
  										<i class="feather-clock"></i> Posted 3 Days ago
  									</small>
  								</div>
  							</div>
  						</a>
  					</div>
          </div>
        </div>
      </div>
    </div>
  </main>
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