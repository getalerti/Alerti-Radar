function SvgComponent(props) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
        <g fillRule="nonzero" fill="none">
          <circle fill="#47A7F6" cx={256} cy={256} r={256} />
          <path
            d="M362.808 368.808H244.123c-65.424 0-118.666-53.246-118.666-118.686 0-65.419 53.242-118.665 118.667-118.665 65.441 0 118.684 53.246 118.684 118.665v118.686z"
            stroke="#FFF"
            strokeWidth={6}
            fill="#FFF"
          />
        </g>
      </svg>
    )
  }
  
  export default SvgComponent