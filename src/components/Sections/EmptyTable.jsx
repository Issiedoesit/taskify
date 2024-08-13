import React from 'react'

const EmptyTable = ({message, bgColor, paddingX, paddingY, textColor, fontSize, textPosition, fontStyle}) => {
  return (
    <div className={`${paddingY || 'py-40'} ${paddingX || 'px-4'} ${bgColor || 'bg-transparent'} ${textPosition || 'text-center'} ${textColor || 'text-brandGray20x'} ${fontStyle || 'font-avenirMedium'} ${fontSize || 'text-xl'} flex flex-col items-center justify-center gap-8`}>
        <svg width="120" height="104" viewBox="0 0 120 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.6365 79.9251C50.1971 79.9251 52.2728 77.8493 52.2728 75.2887C52.2728 72.7281 50.1971 70.6523 47.6365 70.6523C45.0759 70.6523 43.0001 72.7281 43.0001 75.2887C43.0001 77.8493 45.0759 79.9251 47.6365 79.9251Z" fill="#FF9800"/>
          <path d="M84.7892 43.4985C87.8284 49.2358 89.42 55.6287 89.4256 62.1212C89.3373 72.5498 85.3036 82.5582 78.1356 90.1334C70.9675 97.7085 61.197 102.288 50.7892 102.952V88.8576C54.1233 88.0977 57.0607 86.1361 59.0402 83.3477C61.0196 80.5592 61.9025 77.1393 61.5202 73.7411C61.1378 70.3429 59.517 67.2047 56.9674 64.9258C54.4177 62.6469 51.1179 61.3872 47.6983 61.3872C44.2787 61.3872 40.9789 62.6469 38.4292 64.9258C35.8796 67.2047 34.2588 70.3429 33.8764 73.7411C33.4941 77.1393 34.377 80.5592 36.3564 83.3477C38.3359 86.1361 41.2733 88.0977 44.6074 88.8576V102.983C34.1996 102.319 24.4291 97.7394 17.261 90.1643C10.093 82.5891 6.05926 72.5807 5.97102 62.1521C5.92594 56.1705 7.2252 50.2552 9.77284 44.8431C7.69386 43.9654 5.85963 42.5951 4.42842 40.8504C2.99721 39.1056 2.01201 37.0389 1.55783 34.8284C1.10364 32.618 1.1941 30.3302 1.82141 28.1625C2.44872 25.9948 3.59404 24.0123 5.15854 22.386C6.72304 20.7597 8.65974 19.5385 10.8015 18.8278C12.9433 18.117 15.2259 17.9381 17.4523 18.3064C19.6787 18.6747 21.782 19.5791 23.5808 20.9417C25.3797 22.3043 26.8199 24.0841 27.7774 26.1276C33.4902 23.1119 39.8154 21.4386 46.2721 21.2351C52.7288 21.0316 59.1469 22.3031 65.0383 24.9531C66.0884 23.1405 67.5344 21.5886 69.2682 20.4131C71.0021 19.2375 72.979 18.4688 75.0516 18.1643C77.1241 17.8598 79.2386 18.0274 81.2373 18.6545C83.236 19.2816 85.0673 20.352 86.5944 21.7859C88.1215 23.2198 89.305 24.9801 90.0565 26.9354C90.8081 28.8907 91.1083 30.9905 90.9347 33.0781C90.7612 35.1657 90.1183 37.1871 89.0542 38.9914C87.9901 40.7958 86.5321 42.3365 84.7892 43.4985Z" fill="white" stroke="#828282" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M41.022 58.9531C42.0111 63.8368 40.2338 68.2259 37.0502 68.9522C33.8665 69.6786 30.5129 66.1549 29.5238 61.2249L41.022 58.9531Z" fill="white" stroke="#AA004B" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M65.4092 61.3333C64.4201 66.217 61.0356 69.6324 57.8674 69.0606C54.6992 68.4888 52.9219 63.9297 53.9265 59.0615L65.4092 61.3333Z" fill="white" stroke="#AA004B" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M40.8828 62.6936C44.5301 61.1482 51.8246 61.1482 54.0192 63.42L40.8828 62.6936Z" fill="white"/>
          <path d="M40.8828 62.6936C44.5301 61.1482 51.8246 61.1482 54.0192 63.42" stroke="#AA004B" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M51.0056 15.7881L47.2038 15.3554L45.3183 15.0926H44.8392H44.731H44.6538C44.6538 15.0926 44.5301 14.9999 44.6538 14.9535C44.7774 14.9072 44.8392 14.9535 44.9319 14.9535H45.8901C48.4237 15.1692 50.9672 15.2466 53.5092 15.1854C55.7038 15.1854 53.3856 14.3663 52.4119 14.0108C51.4383 13.6554 49.9547 13.0835 48.7338 12.6972C47.5128 12.3108 46.2919 11.9399 45.1019 11.4608C44.7932 11.3442 44.4936 11.2047 44.2056 11.0435C44.0523 10.9717 43.9073 10.8836 43.7728 10.7808C43.6899 10.7085 43.6171 10.6253 43.5565 10.5335C43.5278 10.4516 43.5228 10.3632 43.5419 10.2785C43.561 10.1938 43.6036 10.1162 43.6647 10.0544C43.9787 9.86672 44.3346 9.76047 44.7001 9.74536H45.6738C48.2392 9.74536 50.7892 9.86899 53.401 10.0081L57.2183 10.2244L59.1192 10.3017C59.674 10.3016 60.2276 10.2498 60.7728 10.1472C60.7728 10.1472 60.6492 10.2399 60.6801 10.3326C60.711 10.4254 60.6801 10.4408 60.6801 10.4563L60.5256 10.3635L60.1083 10.2244L59.2274 9.96172L57.4192 9.49808L53.6792 8.74081L46.1838 7.19536C43.6648 6.70123 41.1815 6.04038 38.7501 5.21717C38.441 5.09354 38.1474 4.9699 37.8383 4.81536C37.6818 4.72295 37.5321 4.61967 37.3901 4.50627C37.2825 4.43004 37.1962 4.32753 37.1393 4.2085C37.0825 4.08947 37.0571 3.95789 37.0656 3.82627C37.1738 3.42445 37.4519 3.37808 37.6219 3.30081C37.7919 3.2846 37.9633 3.28979 38.1319 3.31627C38.4628 3.24165 38.7985 3.19001 39.1365 3.16172C40.4159 3.14376 41.6954 3.19535 42.9692 3.31627C48.0692 3.67172 53.1228 4.33627 58.2074 4.76899L60.0928 4.86172H61.0356H61.4992C61.6383 4.86172 61.7928 4.72263 61.6847 4.86172C61.445 4.34062 61.0651 3.89648 60.5874 3.57899C60.1039 3.20674 59.5865 2.88076 59.0419 2.60536C56.7019 1.59295 54.2115 0.97165 51.6701 0.766266C46.5981 0.222458 41.4752 0.383687 36.4474 1.24536C41.4698 0.270329 46.603 -0.00531304 51.701 0.426266C54.2923 0.610076 56.8354 1.22104 59.2274 2.23445C59.778 2.54158 60.2958 2.90406 60.7728 3.31627C61.3605 3.67426 61.812 4.21814 62.0556 4.86172C62.0556 4.86172 62.0556 5.12445 61.9474 5.12445C61.8905 5.16445 61.828 5.19571 61.7619 5.21717H61.4992H60.9892H60.0156C59.3819 5.21717 58.7483 5.21717 58.0992 5.10899C53.0456 4.86172 48.0074 4.16627 42.9383 3.84172C41.671 3.84172 40.4038 3.70263 39.1519 3.84172C38.843 3.82578 38.5335 3.82578 38.2247 3.84172C38.088 3.86664 37.9536 3.90282 37.8228 3.9499C37.6992 3.9499 37.6374 4.07354 37.6683 3.9499C37.8002 4.09124 37.9575 4.20657 38.1319 4.2899C38.4029 4.4292 38.6815 4.55303 38.9665 4.66081C41.3752 5.45175 43.8324 6.0867 46.3228 6.56172L53.8028 8.10717L57.5583 8.89536L59.4283 9.34354L60.3556 9.60627L60.8347 9.79172C60.9299 9.82889 61.0186 9.88106 61.0974 9.94627C61.1518 9.97402 61.1978 10.0159 61.2304 10.0676C61.2631 10.1193 61.2812 10.1788 61.2828 10.2399C61.2795 10.3145 61.2563 10.3868 61.2155 10.4493C61.1747 10.5118 61.1179 10.5623 61.051 10.5954C60.3876 10.7478 59.7035 10.7895 59.0265 10.719H57.0947L53.2774 10.4717C50.7428 10.3172 48.1928 10.1163 45.6738 10.1472C45.0868 10.1287 44.5011 10.2124 43.9428 10.3944L44.051 10.5026C44.1623 10.5904 44.2813 10.668 44.4065 10.7344C44.6692 10.8735 44.9628 10.9972 45.2565 11.1208C46.431 11.5844 47.6365 11.9708 48.8574 12.3572C50.0783 12.7435 51.2838 13.1299 52.4892 13.5626C53.1038 13.7726 53.7029 14.0257 54.2819 14.3199C54.4404 14.4078 54.586 14.517 54.7147 14.6444C54.7586 14.7051 54.7823 14.7781 54.7823 14.8531C54.7823 14.928 54.7586 15.001 54.7147 15.0617C54.6489 15.1597 54.5502 15.231 54.4365 15.2626C54.1157 15.3628 53.7831 15.4199 53.4474 15.4326C50.8922 15.431 48.3387 15.2969 45.7974 15.0308H44.8392H44.7001H44.8547L45.3183 15.1235L47.2192 15.4172L51.0056 15.7881Z" fill="#828282"/>
          <path d="M104.818 95.3797C112.5 95.3797 118.727 89.1524 118.727 81.4706C118.727 73.7888 112.5 67.5615 104.818 67.5615C97.1365 67.5615 90.9092 73.7888 90.9092 81.4706C90.9092 89.1524 97.1365 95.3797 104.818 95.3797Z" stroke="#828282" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M104.818 93.0617C111.22 93.0617 116.409 87.8723 116.409 81.4708C116.409 75.0693 111.22 69.8799 104.818 69.8799C98.4168 69.8799 93.2274 75.0693 93.2274 81.4708C93.2274 87.8723 98.4168 93.0617 104.818 93.0617Z" fill="white" stroke="#828282" stroke-width="0.324545" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M114.864 82.8459C114.779 85.2236 113.756 87.471 112.018 89.0959C110.28 90.7208 107.969 91.591 105.591 91.5159C103.411 91.5934 101.276 90.8855 99.5741 89.5212C97.8722 88.1569 96.7168 86.2268 96.3182 84.0823C97.1633 85.4931 98.3656 86.656 99.8037 87.4537C101.242 88.2515 102.865 88.6558 104.509 88.6259C106.889 88.6968 109.2 87.8232 110.937 86.1958C112.674 84.5684 113.697 82.3195 113.782 79.9405C113.782 79.5266 113.751 79.1133 113.689 78.7041C114.446 79.9541 114.852 81.3848 114.864 82.8459Z" fill="#C6FFFE"/>
          <path d="M90.9091 100.016C92.6162 100.016 94.0001 98.632 94.0001 96.9249C94.0001 95.2178 92.6162 93.834 90.9091 93.834C89.2021 93.834 87.8182 95.2178 87.8182 96.9249C87.8182 98.632 89.2021 100.016 90.9091 100.016Z" stroke="#828282" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>{message || 'No recent transaction found'}</p>
    </div>
  )
}

export default EmptyTable