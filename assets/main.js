const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCDnyD2LYmlRVXv3acqZxUvw&part=snippet%2Cid&order=date&maxResults=50'
const contentVideos = document.querySelector('#content-ListVideos')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0c431d4456msh475fed59ab766edp11d58ejsn4306fd16166e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function getListVideos (api,options){
    const response = await fetch(api,options);
    const data = await response.json();
    return data;
}

async function viewListVideos (api,options){
	try {
		let videos = await getListVideos(api,options)
		const listVideos = videos.items.slice(0,videos.items.length-1)
		console.log(listVideos)
		let view = listVideos.map(video => {
			return `
			<div class="group relative">
				<a href='https://www.youtube.com/watch?v=${video.id.videoId}' target='_blank'>
					<div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
						<img src="${video.snippet.thumbnails.high.url}" alt=${video.snippet.description} class="w-full" />
					</div>
				</a>
				<div class="mt-4 flex justify-between">
					<h3 class="text-sm text-gray-700">
						<span aria-hidden="true" class="inset-0"></span>
						${video.snippet.title}
					</h3>
				</div>
			</div>
			`;
		}).join(' ');
		contentVideos.innerHTML = view;
	} catch (error) {
		console.log(error)
	}
}

viewListVideos(API,options)
