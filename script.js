$(document).ready(function() {
	let url = "https://htun-sys.github.io/cdm-json/data/cdm_support.json";
	$.getJSON(url, function(response) {
		buildInfoSection("support");
		configureSelectRegions (response);
	});//end of getJSON

	// $("a.home").on("click", function() {
	// 	toggleSelectBox(true);
	// 	$("section#container").empty();
	// 	$("select").val("PLACEHOLDER");
	// })

	// $("a.freeRide").on("click", function() {
	// 	freeRideURL = "https://htun-sys.github.io/cdm-json/data/cdm_support.json";
	// 	removeInfoSection();
	// 	buildInfoSection("freeRide");
	// 	$.getJSON(freeRideURL, function(freeRideData) {
	// 		buildCards (freeRideData);
	// 	});
	// });//endof freeRide click handler
});

function configureSelectRegions (response) {
	let regions = response.map((obj)=>{
			return obj["region"]
		});
		let options = "";
		let uniqueRegions = Array.from(new Set(regions));
		for (let i=0;i < uniqueRegions.length;i++) {
			options += `<option value=${uniqueRegions[i]}>
			${codeToString(uniqueRegions[i])}
			</option>`;
		}
		$("#division").append(options);

		$("select#division").change(function() {
			let selectedDivision = $("select option:selected").val();

			if (selectedDivision) {
				$("footer").css("display","block");
			} else {
				$("footer").css("display","none");
			}
			
			let data = response.filter((obj)=>(obj["region"]===selectedDivision));
			buildCards(data);
		});
}

function buildCards (data) {
	$("section#container").empty();
	$("section#container").append(`<h3 class="heading">ရှာဖွေမှုစုစုပေါင်း (${data.length})ခု</h3>`);
			for (let i=0;i<data.length;i++) {
				let divCard = $("<div>", {"class":"card", "id":`card${i}`});
				let divCardBody = $("<div>", {"class":"card-body"});
				let heading = $("<h4>", {"class":"card-title"});
				heading.text(data[i]["name"]);
				let townText = $("<p>",{"class":"card-text"});
				townText.text(data[i]["town"]);

				$("section#container").append(divCard);
				divCard.append(divCardBody);
				divCardBody.append(heading);
				divCardBody.append(townText);

				if (data[i]["contacts"]) {
					let contactStr = data[i]["contacts"].replace(/\s+/g, '');
					let contactList = contactStr.split("/");
					divCardBody.append("Contacts / ")
					for (let i=0;i<contactList.length;i++) {
						divCardBody.append($("<a>", {
							"href":`tel:${contactList[i]}`,
						}).text(contactList[i]));
						divCardBody.append(" / ");
					}
				}

				if (data[i]["facebook"]) {

					var facebookSvgString = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-facebook' viewBox='0 0 16 16'>
  						<path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z'></path>
  						</svg>`;
					divCardBody.append("<br>");
					let facebookLink = $("<a>", {"href":data[i]["facebook"]});
					let facebookButton = $("<button>", {
						"type":"button",
						"class":"btn btn-primary facebook"
					});
					facebookButton.append(facebookSvgString);
					facebookButton.append(" Facebook");
					facebookLink.append(facebookButton);
					divCardBody.append(facebookLink);
				}
			}//end of for loop
		}

//helper functions

function codeToString(division_code) {
	var dict = {
		"YGN": "ရန်ကုန်တိုင်းဒေသကြီး",
		"MDY": "မန္တလေးတိုင်းဒေသကြီး",
		"MGY": "မကွေးတိုင်းဒေသကြီး",
		"SGG":"စစ်ကိုင်းတိုင်းဒေသကြီး",
		"TNI":"တနဿ်ရီတိုင်းဒေသကြီး",
		"AYY":"ဧရာဝတီတိုင်းဒေသကြီး",
		"BGO":"ပဲခူးတိုင်းဒေသကြီး",
		"CHN":"ချင်းပြည်နယ်",
		"KYN":"ကရင်ပြည်နယ်",
		"KYH":"ကယားပြည်နယ်",
		"RKE":"ရခိုင်ပြည်နယ်",
		"MON":"မွန်ပြည်နယ်",
		"KCN":"ကချင်ပြည်နယ်",
		"NPW":"နေပြည်တော်",
		"SHN": "ရှမ်းပြည်နယ်"
	};
	return dict[division_code];
}

function buildInfoSection(option) {
	$("#search").empty()
	let mainSection = $("#search");
	let divContainer= $("<div>", {"class":"container"});
	mainSection.append(divContainer);
	mainSection.append($("<hr>"));

	if (option === "support") {
	divContainer.append($("<h3>").text("တိုင်းဒေသကြီးအလိုက်ရှာရန်"));

	var searchIconSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"></path></svg>`;
	divContainer.append(searchIconSvgString);
	selectDivision = $("<select>", {"id":"division"});
	selectOption = $("<option>", {"value":"PLACEHOLDER"}).text("-- တိုင်းဒေသကြီး --");
	selectDivision.append(selectOption);
	divContainer.append(selectDivision);
	}
	divContainer.append($("<p>").html("အချို့ အချက်အလက်များသည် ကာယကံရှင်တို့ပေါ် မူတည်၍ အပြောင်းအလဲများရှိနိုင်ပါသဖြင့် လိုအပ်ချက်များ၊ <br> အပြည့်အစုံ မဖော်ပြနိုင်မှုများ အနည်းအငယ်ရှိနိုင်သည်ကို နားလည်ပေးစေလိုပါသည်။"));
}

function removeInfoSection() {
	$("#search").empty()
}



