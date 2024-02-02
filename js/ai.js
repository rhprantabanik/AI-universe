const aiLoader = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showAllAiDetails(data.data.tools))
}

aiLoader();

const showAllAiDetails = (details) => {
    // console.log(details);
    // Display 6 items

    details.forEach(detail => {
        // console.log(detail)

        // 1.Get the main container
        const aiContainer = document.getElementById('ai-container');
        // 2.creating child div for elements
        const aiDiv = document.createElement('div');
        const imageSource = detail.image ? detail.image : "No image Found";
        // Features if else ladder
        const featureOne = detail.features[0] ? detail.features[0] : "No data found";
        const featureTwo = detail.features[1] ? detail.features[1] : "No data found";
        const featureThree = detail.features[2] ? detail.features[2] : "No data found";
        // Name & Date if else ladder
        const itemName = detail.name ? detail.name : "No data found";
        const dateData = detail.published_in ? detail.published_in : "No data found";
        aiDiv.innerHTML = `
        
        <div class="border border-1 rounded-lg p-4">
        <img  src="${imageSource}" class=" border rounded-lg" alt="   No image Found  "></img>
            <h5 class="card-title text-dark fs-5 fw-bold mb-3 mt-3">Features</h5>
            <p class="align-bottom">
            <ol class=" list-group-numbered">
            <li class="list-group-item ">${featureOne}</li>
            <li class="list-group-item">${featureTwo}</li>
            <li class="list-group-item">${featureThree}</li>
            </ol>
            </p>
            
            <div class="border-top mt-4  d-flex flex-row text-center justify-content-between align-items-center">
              <div>
              <div><p class="text-dark fs-5 fw-bold mt-3 mb-2">${itemName}</p> <p>
               <div></div>
              ${dateData}</p> </div>
              </div>
              <div> <button  onclick="loadAiDetail(${detail.id})" type="button" class="btn  text-light" style="float:right;" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <div class=""><img class="align-items-center" style="width:20px; border-radius:50%;" src="download.png">
              </button></div>
            </div>         
        `;

        aiContainer.appendChild(aiDiv);

    });
}



// modal related work
const loadAiDetail = (id) => {
    // console.log(id);
    const formattedId = (id >= 1 && id <= 9) ? `0${id}` : id;
    const url = `https://openapi.programming-hero.com/api/ai/tool/${formattedId}/`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => eachAiDetails(data.data))
}

const eachAiDetails = (eachAi) => {
    // console.log(eachAi);
    const modalContainer = document.getElementById('modalId')

    // API datas if else-if ladder.
    const basicMonth = eachAi.pricing[0].price ? eachAi.pricing[0].price : "No Data";
    const basicS = eachAi.pricing[0].plan ? eachAi.pricing[0].plan : "No Data";
    const proMonth = eachAi.pricing[1].price ? eachAi.pricing[1].price : "No Data";
    const proS = eachAi.pricing[1].plan ? eachAi.pricing[1].plan : "No Data";
    const contactUs = eachAi.pricing[2].price ? eachAi.pricing[2].price : "No Data";
    const contactUsNeed = eachAi.pricing[2].plan ? eachAi.pricing[2].plan : "No Data";
    // Features and Integrations if else ladder.
    const CustomizableResponses = eachAi.features[1].feature_name ? eachAi.features[1].feature_name : "No Data Found";
    const MultilingualSupport = eachAi.features[2].feature_name ? eachAi.features[2].feature_name : "No Data Found";
    const SeamlessIntegration = eachAi.features[3].feature_name ? eachAi.features[3].feature_name : "No Data Found";

    const FBMessenger = eachAi.integrations[0] ? eachAi.integrations[0] : "No Data Found";
    const Slack = eachAi.integrations[1] ? eachAi.integrations[1] : "No Data Found";
    const Telegram = eachAi.integrations[2] ? eachAi.integrations[2] : "No Data Found";
    // image
    const modalImage = eachAi.image_link ? eachAi.image_link : "NO IMAGE FOUND";
    // modal input & output ladder
    const modalInput = eachAi.input_output_examples[0].input ? eachAi.input_output_examples[0].input : "No data found";
    const modalOutput = eachAi.input_output_examples[1].input ? eachAi.input_output_examples[1].input : "No data found";
    // accuracy
    const accuracyApi = eachAi.accuracy.score ? eachAi.accuracy.score : "No data found";
    let accuracyPercentage = accuracyApi * 100;
    modalContainer.innerHTML = `
    <div class=" d-flex flex-row justify-content-center container gap-3 p-5">
                            <div class="p-4 border border-danger rounded-lg w-50 bg-red-100">
                                <div class="">
                                <h1 style="font-size:20px; font-weight:semi-bold;">${eachAi.description}</h1>
                                    <div class=" d-flex flex-row justify-content-center justify-content-around p-2 m-2 text-center fw-bold ">
                                        <div class="border border-dark-subtle rounded-lg  p-2 m-1 bg-light-subtle text-success"> ${basicMonth} </br> ${basicS}
                                        </div>
                                        <div class="border border-dark-subtle rounded-lg  p-2 m-1 bg-light-subtle text-warning"> ${proMonth} <br> ${proS}
                                        </div>
                                        <div class=" border border-dark-subtle rounded-lg p-2 m-1 bg-light-subtle text-danger"> ${contactUs} <br> ${contactUsNeed}
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row justify-content-around">
                                        <div class="d-flex flex-column justify-content-evenly p-4 m-1>
                                            <h3 style="font-size: 25px;">Features</h3>
                                            <ul class="ml-5" style="list-style-type: disc";>
                                                <li>${CustomizableResponses}</li>
                                                <li>${MultilingualSupport}</li>
                                                <li>${SeamlessIntegration}</li>
                                            </ul>
                                        </div>
                                        <div class="d-flex flex-column justify-content-evenly p-2 m-1">
                                            <h3 style="font-size:25px;"> Integrations</h3>
                                            <ul class="ml-5" style="list-style-type: disc";>
                                                <li>${FBMessenger}</li>
                                                <li>${Slack}</li>
                                                <li>${Telegram}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 border border-light-subtle rounded-lg   d-flex flex-column justify-content-evenly align-items-stretch">                                                          
                               <div>
                               <p style="width:112px; position:absolute; right: 20px; top: 20px;  " class= "p-2 bg-danger text-white rounded-lg ">${accuracyPercentage}% accuracy</p>
                               <img  src="${modalImage}"class="img-fluid "  alt="No image Found"></img>
                              </div>                                                    
                               <div class="text-center">
                                <h3 style="font-size:25px; font-weight:500; margin-bottom:20px;">${modalInput}</h3>
                                <p>${modalOutput}</p>
                                
                            </div>
                        </div>
    `;
}




