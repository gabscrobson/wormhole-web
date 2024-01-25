interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
  type?: 'submit' | 'reset' | 'button'
}

export default function Button({ children, className, ...props }: ButtonProps) {
  const classes =
    'p-2 text-gray-400 border border-gray-400 hover:border-white hover:text-white rounded-md flex items-center justify-center gap-1 transition-all disabled:pointer-events-none select-none' +
    ' ' +
    className

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
