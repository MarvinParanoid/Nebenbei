import type { IconName } from '../types'

/**
 * The situation's own mark, on the home list only. Inside a chat you are
 * talking to Jonas, not to "Die Spülmaschine", so there the avatar is a
 * monogram — home is where the *situation* needs an identity.
 *
 * Hand-drawn rather than an icon set: one stroke weight, rounded ends, a
 * little wonky on purpose. And they are pictograms, never emoji — emoji belong
 * to the people inside the conversation.
 */
const PATHS: Record<IconName, React.ReactNode> = {
  plate: (
    <>
      <path d="M4 5.5v4.5M6.6 5.5v4.5M9.2 5.5v4.5M6.6 10v8.5" />
      <circle cx="16" cy="12.5" r="6" />
    </>
  ),
  cup: (
    <>
      <path d="M5 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" />
      <path d="M16 9.5h1.8a2.4 2.4 0 0 1 0 4.8H16" />
      <path d="M3.5 21h14" />
    </>
  ),
  glasses: (
    <>
      <path d="M4 4h6.5l-3.2 5.6z" />
      <path d="M7.3 9.6V17M4.8 17.5h5" />
      <path d="M13.5 6.5H20l-3.2 5.6z" />
      <path d="M16.8 12.1V19.5M14.3 20h5" />
    </>
  ),
  bin: (
    <>
      <path d="M4 7h16M10 4.5h4" />
      <path d="M6.2 7 7.3 20h9.4L17.8 7" />
      <path d="M10.2 11v5.5M13.8 11v5.5" />
    </>
  ),
  door: (
    <>
      <path d="M6 3.5h12V21H6z" />
      <path d="M4 21h16" />
      <circle cx="14.8" cy="12.5" r="1.1" />
    </>
  ),
  form: (
    <>
      <path d="M6 3.5h8.5L18 7v13.5H6z" />
      <path d="M14.2 3.5V7H18" />
      <path d="M9 11.5h6M9 15h6M9 18.2h3.5" />
    </>
  ),
  stamp: (
    <>
      <path d="M9.5 3.5h5v4l2.2 4.5H7.3L9.5 7.5z" />
      <path d="M5 15h14v3.5H5zM4 21h16" />
    </>
  ),
  laptop: (
    <>
      <path d="M5.5 5.5h13v9h-13z" />
      <path d="M3 17.5h18l-1.6 2.8H4.6z" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="15.5" r="4.2" />
      <circle cx="18" cy="15.5" r="4.2" />
      <path d="M6 15.5 11 8h4.4l2.6 7.5" />
      <path d="M10.2 8h5.2" />
    </>
  ),
  tag: (
    <>
      <path d="M12.5 3.5H20.5V11l-8.6 8.6-8-8z" />
      <circle cx="17.2" cy="6.8" r="1.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12.5" r="8.5" />
      <path d="M12 7.5v5.5l3.5 2.2" />
    </>
  ),
  train: (
    <>
      <path d="M6.5 9.5a5.5 5.5 0 0 1 11 0V16h-11z" />
      <path d="M9.6 9.8h4.8v3.4H9.6z" />
      <path d="M8.2 16l-1.7 4.2M15.8 16l1.7 4.2M4.5 20.5h15" />
    </>
  ),
}

export function Pictogram({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
