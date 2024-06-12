import { Box } from '@chakra-ui/react';

export function Logo({ color }: { color: string }) {
  return (
    <Box width="100%">
      <svg viewBox="0 0 707 154" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M271.103 122L284.988 38.3636H319.537C325.798 38.3636 331.012 39.5752 335.178 41.9982C339.343 44.4213 342.297 47.8108 344.039 52.1669C345.782 56.523 346.177 61.5733 345.224 67.3178C344.298 73.1168 342.215 78.1671 338.975 82.4688C335.763 86.7704 331.625 90.1055 326.561 92.4741C321.497 94.8427 315.739 96.027 309.286 96.027H288.01L290.664 80.1001H308.224C311.301 80.1001 313.955 79.5692 316.188 78.5075C318.448 77.4457 320.258 75.9619 321.619 74.0561C322.981 72.1503 323.879 69.9042 324.315 67.3178C324.723 64.7314 324.56 62.4989 323.825 60.6204C323.089 58.7146 321.769 57.2444 319.863 56.2099C317.985 55.1753 315.534 54.658 312.512 54.658H302.548L291.317 122H271.103ZM361.283 123.062C357.308 123.062 353.878 122.395 350.992 121.061C348.133 119.699 346.037 117.644 344.703 114.894C343.396 112.144 343.083 108.714 343.764 104.603C344.363 101.118 345.465 98.1914 347.072 95.8228C348.705 93.427 350.706 91.4804 353.075 89.983C355.471 88.4856 358.139 87.3421 361.079 86.5526C364.019 85.763 367.096 85.2321 370.309 84.9599C373.902 84.6332 376.815 84.2792 379.048 83.8981C381.308 83.5169 382.996 82.986 384.112 82.3054C385.228 81.5975 385.909 80.6174 386.154 79.3651V79.1609C386.48 77.0645 386.031 75.4446 384.806 74.3011C383.581 73.1577 381.743 72.5859 379.293 72.5859C376.679 72.5859 374.447 73.1577 372.595 74.3011C370.744 75.4446 369.451 77.0237 368.716 79.0384L350.42 78.3849C351.564 74.5734 353.524 71.1702 356.301 68.1754C359.078 65.1534 362.604 62.7848 366.878 61.0696C371.18 59.3272 376.148 58.456 381.784 58.456C385.759 58.456 389.353 58.9324 392.565 59.8853C395.778 60.811 398.487 62.1722 400.692 63.9691C402.925 65.7388 404.517 67.9168 405.47 70.5032C406.423 73.0896 406.627 76.0436 406.083 79.3651L398.936 122H380.15L381.621 113.261H381.131C379.66 115.384 377.932 117.181 375.944 118.651C373.984 120.121 371.779 121.224 369.328 121.959C366.878 122.694 364.196 123.062 361.283 123.062ZM369.696 109.994C371.792 109.994 373.78 109.558 375.658 108.687C377.537 107.816 379.116 106.618 380.396 105.093C381.702 103.541 382.533 101.744 382.887 99.7024L383.826 93.7401C383.254 94.0395 382.533 94.3118 381.661 94.5568C380.79 94.8018 379.865 95.0333 378.885 95.2511C377.904 95.4416 376.897 95.6322 375.862 95.8228C374.855 95.9861 373.889 96.1359 372.963 96.272C371.003 96.5715 369.301 97.0343 367.858 97.6605C366.415 98.2867 365.258 99.1035 364.387 100.111C363.543 101.091 363.026 102.262 362.835 103.623C362.508 105.665 362.985 107.244 364.264 108.36C365.544 109.449 367.355 109.994 369.696 109.994ZM411.147 122L421.601 59.2727H440.999L439.08 70.7074H439.733C441.557 66.5691 443.94 63.4927 446.88 61.478C449.82 59.4361 453.006 58.4151 456.436 58.4151C457.362 58.4151 458.287 58.4832 459.213 58.6193C460.166 58.7282 461.064 58.8916 461.908 59.1094L458.968 76.5064C458.042 76.1525 456.831 75.8938 455.333 75.7305C453.836 75.5399 452.475 75.4446 451.25 75.4446C448.881 75.4446 446.676 75.9755 444.634 77.0373C442.619 78.0718 440.904 79.5284 439.488 81.407C438.1 83.2583 437.188 85.4363 436.752 87.9411L431.116 122H411.147ZM480.255 105.542L484.298 81.7337H487.034L508.515 59.2727H531.139L499.612 91.4531H494.344L480.255 105.542ZM459.55 122L473.435 38.3636H493.405L479.52 122H459.55ZM498.509 122L486.421 95.9453L501.981 81.7745L521.583 122H498.509ZM527.831 122L538.286 59.2727H558.256L547.801 122H527.831ZM549.68 51.9219C546.848 51.9219 544.548 50.9826 542.778 49.104C541.008 47.2255 540.314 44.9794 540.695 42.3658C541.076 39.7249 542.41 37.4788 544.697 35.6275C546.984 33.7762 549.53 32.8505 552.334 32.8505C555.165 32.8505 557.439 33.7762 559.154 35.6275C560.896 37.4788 561.577 39.7249 561.196 42.3658C560.869 44.9794 559.562 47.2255 557.275 49.104C555.016 50.9826 552.484 51.9219 549.68 51.9219ZM586.566 86.2259L580.604 122H560.634L571.089 59.2727H590.079L588.2 70.7891H588.894C590.854 66.9503 593.7 63.9419 597.429 61.7638C601.159 59.5586 605.352 58.456 610.008 58.456C614.391 58.456 618.053 59.4361 620.993 61.3963C623.933 63.3565 626.016 66.1063 627.241 69.6456C628.466 73.1577 628.671 77.2823 627.854 82.0195L621.156 122H601.187L607.19 85.94C607.789 82.4824 607.367 79.7734 605.924 77.8132C604.508 75.8258 602.194 74.832 598.981 74.832C596.885 74.832 594.966 75.2949 593.223 76.2205C591.508 77.119 590.065 78.4122 588.894 80.1001C587.751 81.7881 586.975 83.83 586.566 86.2259ZM658.717 146.83C652.728 146.83 647.745 145.999 643.77 144.338C639.796 142.678 636.828 140.404 634.868 137.518C632.907 134.633 631.968 131.366 632.05 127.717L651.162 126.656C651.325 127.962 651.802 129.092 652.591 130.045C653.381 130.998 654.511 131.719 655.981 132.21C657.451 132.727 659.275 132.985 661.453 132.985C664.802 132.985 667.715 132.169 670.193 130.535C672.67 128.902 674.195 126.084 674.767 122.082L676.604 111.055H675.91C674.821 112.988 673.351 114.717 671.499 116.242C669.648 117.766 667.457 118.964 664.925 119.836C662.393 120.707 659.588 121.142 656.512 121.142C651.911 121.142 647.895 120.081 644.465 117.957C641.034 115.806 638.557 112.485 637.032 107.993C635.508 103.473 635.331 97.6605 636.501 90.5547C637.726 83.2311 639.904 77.2006 643.035 72.4634C646.166 67.699 649.814 64.1733 653.98 61.8864C658.173 59.5994 662.461 58.456 666.844 58.456C670.138 58.456 672.861 59.0277 675.012 60.1712C677.162 61.2874 678.85 62.7304 680.075 64.5C681.301 66.2696 682.172 68.1074 682.689 70.0131H683.261L685.017 59.2727H704.905L694.45 122.245C693.606 127.581 691.551 132.073 688.284 135.722C685.017 139.37 680.838 142.133 675.747 144.012C670.655 145.89 664.979 146.83 658.717 146.83ZM665.741 106.604C668.164 106.604 670.356 105.964 672.316 104.685C674.276 103.405 675.924 101.567 677.258 99.1715C678.592 96.7757 679.531 93.9034 680.075 90.5547C680.62 87.1515 680.62 84.2248 680.075 81.7745C679.558 79.297 678.551 77.3912 677.053 76.0572C675.556 74.7231 673.582 74.0561 671.132 74.0561C668.654 74.0561 666.449 74.7367 664.516 76.098C662.61 77.4593 661.004 79.3787 659.697 81.8562C658.418 84.3065 657.519 87.206 657.002 90.5547C656.457 93.9034 656.417 96.7757 656.879 99.1715C657.369 101.567 658.35 103.405 659.82 104.685C661.317 105.964 663.291 106.604 665.741 106.604Z"
          fill={color}
        />
        <path
          d="M168.332 30.6325L187.544 30.0569L179.551 89.3605C178.655 96.0191 176.3 101.892 172.485 106.981C168.671 112.069 163.743 116.095 157.704 119.059C151.663 121.993 144.872 123.573 137.329 123.799C129.786 124.025 123.385 122.84 118.126 120.245C112.867 117.619 109.009 113.856 106.553 108.956C104.096 104.056 103.316 98.2766 104.212 91.618L112.205 32.3143L131.417 31.7387L123.597 89.394C123.168 92.8708 123.526 95.9391 124.672 98.5989C125.847 101.258 127.715 103.319 130.275 104.781C132.835 106.244 135.964 106.92 139.662 106.81C143.389 106.698 146.738 105.828 149.709 104.199C152.709 102.57 155.146 100.38 157.017 97.6297C158.918 94.8786 160.083 91.7646 160.512 88.2879L168.332 30.6325Z"
          fill={color}
        />
        <rect x="1" y="103.167" width="80" height="15" fill={color} />
        <path
          d="M1 41.5C43.7922 46.666 60.6354 45.0336 81 36V49.8083C57.1036 62.0517 39.1515 62.6992 1 55.5V41.5Z"
          fill={color}
        />
        <path
          d="M6 72.5L3.5 74L1 75.5V91L1.5 90.5L3.5 89.5L6 88L9 87L13 86H16.5L18 86.5L20.5 87.5L22.5 88.5L25.5 90.5L27.5 91.5L29.5 92H34L36.5 91.5L40.5 89.5L43.5 88L47 86.5L50 86H53L55.5 86.5L58.5 88L61.5 90L64.5 91.5L67 92H71H72L74 91.5L76 90.5L78 89.5L79.5 88.5L81 87.5V71L80.5 71.5L80 72L79.5 72.5L79 73L78 74L77 75L75.5 75.5L74.5 76L72.5 76.5L71 77H69.5H67L65.5 76.5L64 76L62.5 75.5L61.5 75L60.5 74.5L59.5 73.5L58 72.5L56.5 72L55.5 71.5L54 71H53H49.5H48.5L47 71.5L45.5 72L43.5 73L41.5 74L36 76.5L34 77H30.5H29L28 76.5L25.5 75.5L20 72.5L17.5 71.5L16 71H12L9.5 71.5L6 72.5Z"
          stroke={color}
        />
        <path
          d="M1.5 75.74L6 73L12 71L16 71.5L19 72.5L29 77.5L35 77L47.5 71.5H54L56 72L58.5 73L60 74.5L66.5 77H70L75 76L77.5 75L80 72H81V76V87L77.5 90L73.5 91.5L68 92L62.5 90.5L56 86.5L50.5 86L45 87L38.5 90L34.5 92H30L26.5 91L20 87L16 86H12.5L8.5 87L4 89L1.5 90V75.74Z"
          fill={color}
        />
        <path
          d="M109.417 32.4999L113.5 30.9999L118.917 87.4999L104 93.9999L109.417 32.4999Z"
          fill={color}
        />
        <path
          d="M113.5 30.9999H131.5V31.4999L131 32.4999H129L113 33.4999L113.5 30.9999Z"
          fill={color}
        />
        <path
          d="M249.025 69.7536V83.5568H210.882V69.7536H249.025Z"
          fill={color}
        />
      </svg>
    </Box>
  );
}