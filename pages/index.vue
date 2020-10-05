<template>
  <section>
		<div class="gap2 gray-bg">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<div class="row merged20" id="page-contents">
							<div class="col-lg-3">
								<aside class="sidebar static left">
									<div class="widget d-flex flex-column">
										<h4 class="widget-title">Tạo bài đăng</h4>
                    <div class="d-flex mb-3">
                      <a-button type="primary" class="m-auto" @click="logOut">
                      Tuyển dụng
                      </a-button>
                    <a-button type="primary" class="m-auto">
                      Giới thiệu công ty
                    </a-button>
                    </div>
									</div><!-- Shortcuts -->

                  <div class="widget d-flex flex-column">
										<h4 class="widget-title">Bộ lọc</h4>
									</div><!-- Shortcuts -->
								</aside>
							</div><!-- sidebar -->

							<div class="col-lg-6">
								<div class="loadMore">
									<div class="central-meta item">
										<div class="user-post">
											<div class="friend-info">
												<figure>
													<!-- <img src="images/resources/nearly1.jpg" alt=""> -->
												</figure>
												<div class="friend-name">
													<div class="more">
														<div class="more-post-optns"><i class="ti-more-alt"></i>
															<ul>
																<li><i class="fa fa-pencil-square-o"></i>Edit Post</li>
																<li><i class="fa fa-trash-o"></i>Delete Post</li>
																<li class="bad-report"><i class="fa fa-flag"></i>Report Post</li>
																<li><i class="fa fa-address-card-o"></i>Boost This Post</li>
																<li><i class="fa fa-clock-o"></i>Schedule Post</li>
																<li><i class="fa fa-wpexplorer"></i>Select as featured</li>
																<li><i class="fa fa-bell-slash-o"></i>Turn off Notifications</li>
															</ul>
														</div>
													</div>
													<ins><a href="time-line.html" title="">Jack Carter</a> Post Album</ins>
													<span><i class="fa fa-globe"></i> published: September,15 2020 19:PM </span>
												</div>
												<div class="post-meta">
													<p>
														Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.
													</p>
													<figure>
														<div class="img-bunch">
															<div class="row">
																<div class="col-lg-6 col-md-6 col-sm-6">
																	<!-- <figure>
																		<a class="strip" href="images/resources/album1.jpg" title="" data-strip-group="mygroup" data-strip-group-options="loop: false">
																		<img src="images/resources/album1.jpg" alt="">
																		</a>
																	</figure>
																	<figure>
																		<a class="strip" href="images/resources/album2.jpg" title="" data-strip-group="mygroup" data-strip-group-options="loop: false">
																		<img src="images/resources/album2.jpg" alt="">
																		</a>
																	</figure>
																</div>
																<div class="col-lg-6 col-md-6 col-sm-6">
																	<figure>
																		<a class="strip" href="images/resources/album6.jpg" title="" data-strip-group="mygroup" data-strip-group-options="loop: false">
																		<img src="images/resources/album6.jpg" alt="">
																		</a>
																	</figure>
																	<figure>
																		<a class="strip" href="images/resources/album5.jpg" title="" data-strip-group="mygroup" data-strip-group-options="loop: false">
																		<img src="images/resources/album5.jpg" alt="">
																		</a>
																	</figure>
																	<figure>
																		<a class="strip" href="images/resources/album4.jpg" title="" data-strip-group="mygroup" data-strip-group-options="loop: false">
																		<img src="images/resources/album4.jpg" alt="">
																		</a>
																		<div class="more-photos">
																			<span>+15</span>
																		</div>
																	</figure> -->
																</div>
															</div>
														</div>	
														<ul class="like-dislike">
															<li><a class="bg-purple" href="#" title="Save to Pin Post"><i class="fa fa-thumb-tack"></i></a></li>
															<li><a class="bg-blue" href="#" title="Like Post"><i class="ti-thumb-up"></i></a></li>
															<li><a class="bg-red" href="#" title="dislike Post"><i class="ti-thumb-down"></i></a></li>
														</ul>
													</figure>	
													<div class="we-video-info">
														<ul>
															<li>
																<span class="views" title="views">
																	<i class="fa fa-eye"></i>
																	<ins>1.2k</ins>
																</span>
															</li>
															<li>
																<div class="likes heart" title="Like/Dislike">❤ <span>2K</span></div>
															</li>
															<li>
																<span class="comment" title="Comments">
																	<i class="fa fa-commenting"></i>
																	<ins>52</ins>
																</span>
															</li>

															<li>
																<span>
																	<a class="share-pst" href="#" title="Share">
																		<i class="fa fa-share-alt"></i>
																	</a>
																	<ins>20</ins>
																</span>	
															</li>
														</ul>
														<!-- <div class="users-thumb-list">
															<a data-toggle="tooltip" title="Anderw" href="#">
																<img alt="" src="images/resources/userlist-1.jpg">  
															</a>
															<a data-toggle="tooltip" title="frank" href="#">
																<img alt="" src="images/resources/userlist-2.jpg">  
															</a>
															<a data-toggle="tooltip" title="Sara" href="#">
																<img alt="" src="images/resources/userlist-3.jpg">  
															</a>
															<a data-toggle="tooltip" title="Amy" href="#">
																<img alt="" src="images/resources/userlist-4.jpg">  
															</a>
															<a data-toggle="tooltip" title="Ema" href="#">
																<img alt="" src="images/resources/userlist-5.jpg">  
															</a>
															<span><strong>You</strong>, <b>Sarah</b> and <a href="#" title="">24+ more</a> liked</span>
														</div> -->
													</div>
												</div>
												<div class="coment-area" style="display: block;">
													<ul class="we-comet">
														<li>
															<div class="comet-avatar">
																<!-- <img src="images/resources/nearly3.jpg" alt=""> -->
															</div>
															<div class="we-comment">
																<h5><a href="time-line.html" title="">Jason borne</a></h5>
																<p>we are working for the dance and sing songs. this video is very awesome for the youngster. please vote this video and like our channel</p>
																<div class="inline-itms">
																	<span>1 year ago</span>
																	<a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a>
																	<a href="#" title=""><i class="fa fa-heart"></i><span>20</span></a>
																</div>
															</div>

														</li>
														<li>
															<div class="comet-avatar">
																<!-- <img src="images/resources/comet-4.jpg" alt=""> -->
															</div>
															<div class="we-comment">
																<h5><a href="time-line.html" title="">Sophia</a></h5>
																<p>we are working for the dance and sing songs. this video is very awesome for the youngster.
																	<i class="em em-smiley"></i>
																</p>
																<div class="inline-itms">
																	<span>1 year ago</span>
																	<a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a>
																	<a href="#" title=""><i class="fa fa-heart"></i><span>20</span></a>
																</div>
															</div>
														</li>
														<li>
															<a href="#" title="" class="showmore underline">more comments+</a>
														</li>
														<li class="post-comment">
															<div class="comet-avatar">
																<!-- <img src="images/resources/nearly1.jpg" alt=""> -->
															</div>
															<div class="post-comt-box">
																<form method="post">
																	<textarea placeholder="Post your comment"></textarea>
																	<div class="add-smiles">
																		<div class="uploadimage">
																			<i class="fa fa-image"></i>
																			<label class="fileContainer">
																				<input type="file">
																			</label>
																		</div>
																		<span class="em em-expressionless" title="add icon"></span>
																		<div class="smiles-bunch">
																			<i class="em em---1"></i>
																			<i class="em em-smiley"></i>
																			<i class="em em-anguished"></i>
																			<i class="em em-laughing"></i>
																			<i class="em em-angry"></i>
																			<i class="em em-astonished"></i>
																			<i class="em em-blush"></i>
																			<i class="em em-disappointed"></i>
																			<i class="em em-worried"></i>
																			<i class="em em-kissing_heart"></i>
																			<i class="em em-rage"></i>
																			<i class="em em-stuck_out_tongue"></i>
																		</div>
																	</div>

																	<button type="submit"></button>
																</form>	
															</div>
														</li>
													</ul>
												</div>
											</div>

										</div>
									</div><!-- album post -->
							    </div>
							</div><!-- centerl meta -->
							<div class="col-lg-3">
								<aside class="sidebar static right">
									<div class="widget">
										<h4 class="widget-title">Your page</h4>	
										<div class="your-page">
											<figure>
												<!-- <a href="#" title=""><img src="images/resources/friend-avatar9.jpg" alt=""></a> -->
											</figure>
											<div class="page-meta">
												<a href="#" title="" class="underline">My Creative Page</a>
												<span><i class="ti-comment"></i><a href="insight.html" title="">Messages <em>9</em></a></span>
												<span><i class="ti-bell"></i><a href="insight.html" title="">Notifications <em>2</em></a></span>
											</div>
											<ul class="page-publishes">
												<li>
													<span><i class="ti-pencil-alt"></i>Publish</span>
												</li>
												<li>
													<span><i class="ti-camera"></i>Photo</span>
												</li>
												<li>
													<span><i class="ti-video-camera"></i>Live</span>
												</li>
												<li>
													<span><i class="fa fa-user-plus"></i>Invite</span>
												</li>
											</ul>
											<div class="page-likes">
												<ul class="nav nav-tabs likes-btn">
													<li class="nav-item"><a class="active" href="#link1" data-toggle="tab" data-ripple="">likes</a></li>
													 <li class="nav-item"><a class="" href="#link2" data-toggle="tab" data-ripple="">views</a></li>
												</ul>
												<!-- Tab panes -->
												
											</div>
										</div>
									</div><!-- page like widget -->
								</aside>
							</div><!-- sidebar -->
						</div>	
					</div>
				</div>
			</div>
		</div>	
	</section>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo
  }, 
  methods: {
    logOut() {
      localStorage.removeItem('currentUser')
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');

.gray-bg {
    float: left;
    width: 100%;
    background: $colorPurple;
}
</style>