export default function VideoTitle() {
  return (
    <div className="flex justify-content-between align-items-center mb-3">
      <h1 className="m-0">GraphQL Crash Course</h1>
      <div className="flex align-items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://yt3.ggpht.com/xDd0XRRN8djYiGkxSaQnOOtlgSic62ag8ZaDc2QwI1LeLuF3voF5-e3ABQk51eAJ1CxcfaBaJI8=s600-c-k-c0x00ffffff-no-rj-rp-mo"
          alt="logo"
          className="border-circle h-2rem w-2rem"
        />
        <p className="m-0">Build With Sohail</p>
      </div>
    </div>
  )
}
