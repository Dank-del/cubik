import { tokenGroup } from '~/interfaces/token';

export const tokens: tokenGroup[] = [
  {
    label: 'USDC',
    value: 'usd',
    devNetAdd: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    mainNetAdd: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    icon: (
      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_789_9405)">
          <path
            d="M5 10C7.77085 10 10 7.77085 10 5C10 2.22915 7.77085 0 5 0C2.22915 0 0 2.22915 0 5C0 7.77085 2.22915 10 5 10Z"
            fill="#2775CA"
          />
          <path
            d="M6.37515 5.79102C6.37515 5.06187 5.93765 4.81187 5.06265 4.70772C4.43765 4.62437 4.31265 4.45772 4.31265 4.16602C4.31265 3.87432 4.521 3.68687 4.93765 3.68687C5.31265 3.68687 5.521 3.81187 5.62515 4.12437C5.646 4.18687 5.7085 4.22852 5.771 4.22852H6.1043C6.18765 4.22852 6.25015 4.16602 6.25015 4.08272V4.06187C6.1668 3.60352 5.7918 3.24937 5.31265 3.20772V2.70772C5.31265 2.62437 5.25015 2.56187 5.146 2.54102H4.8335C4.75015 2.54102 4.68765 2.60352 4.6668 2.70772V3.18687C4.0418 3.27022 3.646 3.68687 3.646 4.20772C3.646 4.89522 4.06265 5.16602 4.93765 5.27022C5.521 5.37437 5.7085 5.49937 5.7085 5.83272C5.7085 6.16607 5.4168 6.39522 5.021 6.39522C4.4793 6.39522 4.2918 6.16602 4.2293 5.85352C4.2085 5.77022 4.146 5.72852 4.0835 5.72852H3.7293C3.646 5.72852 3.5835 5.79102 3.5835 5.87437V5.89522C3.6668 6.41602 4.00015 6.79102 4.68765 6.89522V7.39522C4.68765 7.47852 4.75015 7.54102 4.8543 7.56187H5.1668C5.25015 7.56187 5.31265 7.49937 5.3335 7.39522V6.89522C5.9585 6.79102 6.37515 6.35352 6.37515 5.79102Z"
            fill="white"
          />
          <path
            d="M3.93742 7.97978C2.31242 7.39648 1.47907 5.58398 2.08327 3.97978C2.39577 3.10478 3.08327 2.43813 3.93742 2.12563C4.02077 2.08398 4.06242 2.02148 4.06242 1.91728V1.62563C4.06242 1.54228 4.02077 1.47978 3.93742 1.45898C3.91657 1.45898 3.87492 1.45898 3.85407 1.47978C1.87492 2.10478 0.791568 4.20898 1.41657 6.18813C1.79157 7.35478 2.68742 8.25063 3.85407 8.62563C3.93742 8.66728 4.02077 8.62563 4.04157 8.54228C4.06242 8.52148 4.06242 8.50063 4.06242 8.45898V8.16728C4.06242 8.10478 3.99992 8.02148 3.93742 7.97978ZM6.14577 1.47978C6.06242 1.43813 5.97907 1.47978 5.95827 1.56313C5.93742 1.58398 5.93742 1.60478 5.93742 1.64648V1.93813C5.93742 2.02148 5.99992 2.10478 6.06242 2.14648C7.68742 2.72978 8.52077 4.54228 7.91657 6.14648C7.60407 7.02148 6.91657 7.68813 6.06242 8.00063C5.97907 8.04228 5.93742 8.10478 5.93742 8.20898V8.50063C5.93742 8.58398 5.97907 8.64648 6.06242 8.66728C6.08327 8.66728 6.12492 8.66728 6.14577 8.64648C8.12492 8.02148 9.20827 5.91728 8.58327 3.93813C8.20827 2.75063 7.29157 1.85478 6.14577 1.47978Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_789_9405">
            <rect width="10" height="10" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },

  // {
  //   label: 'SOL',
  //   value: 'solana',
  //   devNetAdd: '',
  //   mainNetAdd: '',
  //   icon: (
  //     <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="10" height="10" rx="5" fill="#A169F7" />
  //       <path
  //         d="M8.36582 6.44214L7.27628 7.4319C7.2526 7.4534 7.22394 7.47055 7.1921 7.48226C7.16026 7.49398 7.1259 7.50002 7.09119 7.5H1.92629C1.90165 7.5 1.87754 7.4939 1.85693 7.48245C1.83632 7.47101 1.82011 7.45471 1.81029 7.43556C1.80046 7.41642 1.79746 7.39526 1.80164 7.37469C1.80582 7.35411 1.817 7.33502 1.83381 7.31976L2.92416 6.33C2.94779 6.30856 2.97635 6.29145 3.00809 6.27974C3.03983 6.26802 3.07407 6.26195 3.1087 6.2619H8.27332C8.29796 6.2619 8.32206 6.26801 8.34269 6.27945C8.36327 6.2909 8.37948 6.3072 8.38934 6.32634C8.39915 6.34549 8.40215 6.36664 8.39797 6.38722C8.39379 6.40779 8.38261 6.42688 8.36582 6.44214ZM7.27628 4.44905C7.2526 4.42755 7.22394 4.4104 7.1921 4.39869C7.16026 4.38698 7.1259 4.38094 7.09119 4.38095H1.92629C1.90165 4.38095 1.87754 4.38705 1.85693 4.3985C1.83632 4.40995 1.82011 4.42624 1.81029 4.44539C1.80046 4.46453 1.79746 4.48569 1.80164 4.50627C1.80582 4.52684 1.817 4.54593 1.83381 4.56119L2.92416 5.55095C2.94779 5.5724 2.97635 5.5895 3.00809 5.60122C3.03983 5.61293 3.07407 5.619 3.1087 5.61905H8.27332C8.29796 5.61905 8.32206 5.61295 8.34269 5.6015C8.36327 5.59005 8.37948 5.57376 8.38934 5.55461C8.39915 5.53547 8.40215 5.51431 8.39797 5.49373C8.39379 5.47316 8.38261 5.45407 8.36582 5.43881L7.27628 4.44905ZM1.92629 3.7381H7.09119C7.1259 3.73811 7.16026 3.73207 7.1921 3.72036C7.22394 3.70864 7.2526 3.6915 7.27628 3.67L8.36582 2.68024C8.38261 2.66498 8.39379 2.64589 8.39797 2.62531C8.40215 2.60474 8.39915 2.58358 8.38934 2.56444C8.37948 2.54529 8.36327 2.52899 8.34269 2.51755C8.32206 2.5061 8.29796 2.5 8.27332 2.5H3.1087C3.07407 2.50005 3.03983 2.50612 3.00809 2.51783C2.97635 2.52955 2.94779 2.54665 2.92416 2.5681L1.83409 3.55786C1.8173 3.5731 1.80612 3.59218 1.80193 3.61272C1.79774 3.63327 1.80072 3.65441 1.81051 3.67355C1.8203 3.69269 1.83647 3.70898 1.85704 3.72045C1.8776 3.73191 1.90167 3.73805 1.92629 3.7381Z"
  //         fill="white"
  //       />
  //     </svg>
  //   ),
  // },
];
