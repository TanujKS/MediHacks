document.getElementById('referralForm').addEventListener('submit', async function(event) {
    console.log("SUBMITTED")
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const resultDiv = document.getElementById('codeResult');
    resultDiv.innerHTML = `<h3>Your referral code is:</h3> <div id="codeLoder"><div class="loader"></div></div>`;
    

    try {
        const response = await fetch(`https://us-central1-medihacks-c63d5.cloudfunctions.net/addCode?name=${name}&email=${email}&phone=${phone}`);
        console.log(response.status)
        if (response.ok || response.status === 409) {
            const code = await response.text();
            resultDiv.innerHTML = `<h3>Your referral code is:</h3><h1>${code}</h1>`;
        } else {
            const errorText = await response.text();
            resultDiv.innerHTML += `<p style="color: red;">Error: ${errorText}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p style="color: red;">An unexpected error occurred. Please try again later.</p>`;
    } finally {
        $(".loader").fadeOut();
        $("#codeLoder").delay(200).fadeOut("slow");
    }
});

