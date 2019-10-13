const svg = document.querySelectorAll("#loading-svg path");

for (let i = 0; i < svg.length; i++)
    console.log(
        `Letter ${i} is ${svg[i].getTotalLength()} with d=${svg[i].getAttribute(
            "d"
        )}`
    );
