document.addEventListener("DOMContentLoaded", () => {
    const localCSVPath = "./static/data/latest-posts.csv";

    fetch(localCSVPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load CSV file");
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById("posts-container");
            const rows = data.trim().split("\n");
            const headers = rows.shift().split(",");

            rows.forEach(row => {
                const values = row.split(",");
                const post = {};
                headers.forEach((header, index) => {
                    post[header.trim()] = values[index] ? values[index].trim() : "";
                });

                if (!post.image || !post.url) return;

                const postDiv = document.createElement("div");
                postDiv.className = "post";
                postDiv.innerHTML = `
                    <img src="./static/images/${post.image}" alt="Post image">
                    <div class="post-caption">${post.caption}</div>
                    <hr id="post-hr">
                    <div class="social-icons">
                        <a href="#" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24" fill="none">
                                <g clip-path="url(#clip0_1063_1014)">
                                    <path d="M2.94955 24L2.96501 13.6322H0.574454C0.262755 13.6322 0.0103041 13.3478 0.0103041 12.9996L0 9.65687C0 9.30577 0.252451 9.0185 0.56415 9.0185H2.95213V5.7889C2.95213 2.0399 4.98462 0 7.9522 0H10.3865C10.6982 0 10.9507 0.284367 10.9507 0.635473V3.45303C10.9507 3.80414 10.6982 4.0885 10.3865 4.0885H8.89245C7.27728 4.0885 6.96558 4.95321 6.96558 6.22126V9.0185H10.5128C10.8502 9.0185 11.113 9.35219 11.0743 9.72942L10.7214 13.0722C10.6879 13.3914 10.4458 13.6322 10.1599 13.6322H6.98104L6.96558 24H2.94955Z" fill="#FFE500"/>
                                </g>
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_1063_999)">
                                    <path d="M16.8504 0H7.1496C3.2064 0 0 3.2064 0 7.1496V16.8504C0 20.7936 3.2064 24 7.1496 24H16.8504C20.7936 24 24 20.7936 24 16.8504V7.1496C24 3.2064 20.7936 0 16.8504 0ZM21.5856 16.8504C21.5856 19.4664 19.4664 21.5856 16.8504 21.5856H7.1496C4.5336 21.5856 2.4144 19.4664 2.4144 16.8504V7.1496C2.4144 4.5336 4.5336 2.4144 7.1496 2.4144H16.8504C19.4664 2.4144 21.5856 4.5336 21.5856 7.1496V16.8504Z" fill="#FFE500"/>
                                    <path d="M12 5.79346C8.57758 5.79346 5.79358 8.57746 5.79358 11.9999C5.79358 15.4223 8.57758 18.2063 12 18.2063C15.4224 18.2063 18.2064 15.4223 18.2064 11.9999C18.2064 8.57746 15.4224 5.79346 12 5.79346ZM12 15.7919C9.90478 15.7919 8.20798 14.0927 8.20798 11.9999C8.20798 9.90706 9.90718 8.20786 12 8.20786C14.0928 8.20786 15.792 9.90706 15.792 11.9999C15.792 14.0927 14.0928 15.7919 12 15.7919Z" fill="#FFE500"/>
                                    <path d="M18.2183 7.32707C19.0401 7.32707 19.7063 6.66087 19.7063 5.83907C19.7063 5.01727 19.0401 4.35107 18.2183 4.35107C17.3965 4.35107 16.7303 5.01727 16.7303 5.83907C16.7303 6.66087 17.3965 7.32707 18.2183 7.32707Z" fill="#FFE500"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1063_999">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                        <a href="#" aria-label="YouTube">
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="26" viewBox="0 0 34 26" fill="none">
                                <path d="M26.9382 0.911133H7.0618C3.162 0.911133 0 4.08837 0 8.00697V17.9931C0 21.9117 3.162 25.0889 7.0618 25.0889H26.9382C30.838 25.0889 34 21.9117 34 17.9931V8.00697C34 4.08837 30.838 0.911133 26.9382 0.911133ZM22.1646 13.4834L12.869 17.9384C12.6208 18.058 12.3352 17.8769 12.3352 17.6002V8.41011C12.3352 8.12996 12.6276 7.94889 12.8758 8.0753L22.1714 12.8104C22.4468 12.9505 22.4434 13.3502 22.1646 13.4834Z" fill="#FFE500"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="X">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14.2848 10.1631L23.2224 0H21.1056L13.344 8.82254L7.1472 0H0L9.3696 13.3429L0 24H2.1168L10.308 14.6811L16.8528 24H24M2.88 1.56115H6.132L21.1032 22.5156H17.8512" fill="#FFE500"/>
                            </svg>
                        </a>
                    </div>
                `;
                container.appendChild(postDiv);
            });
        })
        .catch(error => {
            console.error("Error loading CSV:", error);
        });
});
