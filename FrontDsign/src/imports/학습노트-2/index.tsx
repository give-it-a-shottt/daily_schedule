import svgPaths from "./svg-9ed6yu0yeh";

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25.5px] not-italic relative shrink-0 text-[17px] text-white tracking-[-0.425px] whitespace-nowrap">11:11</p>
    </div>
  );
}

function SignalIcon() {
  return (
    <div className="h-[12px] relative shrink-0 w-[18px]" data-name="SignalIcon">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 18 12" width="18">
        <g clipPath="url(#clip0_0_12)" id="SignalIcon">
          <path d={svgPaths.p1ec31400} fill="white" id="Vector" />
          <path d={svgPaths.p19f8d480} fill="white" id="Vector_2" />
          <path d={svgPaths.p13f4aa00} fill="white" id="Vector_3" />
          <path d={svgPaths.p1bfb7500} fill="white" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_0_12">
            <rect fill="white" height="12" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WifiIcon() {
  return (
    <div className="h-[12px] relative shrink-0 w-[17px]" data-name="WifiIcon">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 17 12" width="17">
        <g clipPath="url(#clip0_0_23)" id="WifiIcon">
          <path d={svgPaths.p2c829480} fill="white" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_0_23">
            <rect fill="white" height="12" width="17" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[13px] relative shrink-0 w-[25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 25 13" width="25">
        <g clipPath="url(#clip0_0_19)" id="Icon" opacity="0.8">
          <path d={svgPaths.p3f827980} id="Vector" stroke="white" strokeOpacity="0.9" />
        </g>
        <defs>
          <clipPath id="clip0_0_19">
            <rect fill="white" height="13" width="25" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute h-[4.219px] left-[25.61px] top-[4px] w-[1.391px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="4.21875" preserveAspectRatio="none" viewBox="0 0 1.39062 4.21875" width="1.39062">
        <g clipPath="url(#clip0_0_21)" id="Icon" opacity="0.7">
          <path d={svgPaths.p96fc000} fill="white" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_0_21">
            <rect fill="white" height="4.21875" width="1.39062" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute h-[9px] left-[2px] top-[2px] w-[21px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="9" preserveAspectRatio="none" viewBox="0 0 21 9" width="21">
        <g clipPath="url(#clip0_0_17)" id="Icon">
          <path d={svgPaths.pa544c00} fill="white" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_0_17">
            <rect fill="white" height="9" width="21" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BatteryIcon() {
  return (
    <div className="content-stretch flex flex-col h-[13px] items-start relative shrink-0 w-[27px]" data-name="BatteryIcon">
      <Icon />
      <Icon1 />
      <Icon2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <SignalIcon />
      <WifiIcon />
      <BatteryIcon />
    </div>
  );
}

function Statusbar() {
  return (
    <div className="content-stretch flex items-center justify-between px-[24px] py-[12px] relative shrink-0 w-[402px]" data-name="Statusbar">
      <Text />
      <Container />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] tracking-[1.2px] uppercase whitespace-nowrap">Calendar</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[38px] items-start pt-[2px] relative shrink-0 w-[135.391px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[30px] text-white tracking-[-0.75px] whitespace-nowrap">May 2023</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[135.391px]" data-name="Container">
      <Paragraph />
      <Heading />
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="ChevronLeft">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="ChevronLeft">
          <path clipRule="evenodd" d={svgPaths.p1841ad00} fill="white" fillOpacity="0.6" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <ChevronLeft />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="absolute flex items-center justify-center left-0 size-[14px] top-0">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="relative size-[14px]" data-name="ChevronRight">
          <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
            <g id="ChevronRight">
              <path clipRule="evenodd" d={svgPaths.p1841ad00} fill="white" fillRule="evenodd" id="Vector" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronRightTransform() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[14px]" data-name="ChevronRight:transform">
      <ChevronRight />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <ChevronRightTransform />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center justify-between px-[4px] relative shrink-0 w-[362px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.55px] uppercase whitespace-nowrap">Mo</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="col-1 content-stretch flex items-center justify-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.55px] uppercase whitespace-nowrap">Tu</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="col-2 content-stretch flex items-center justify-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.55px] uppercase whitespace-nowrap">We</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="col-3 content-stretch flex items-center justify-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.55px] uppercase whitespace-nowrap">Th</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="col-4 content-stretch flex items-center justify-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.55px] uppercase whitespace-nowrap">Fr</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="col-5 content-stretch flex items-center justify-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.55px] uppercase whitespace-nowrap">Sa</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="col-6 content-stretch flex items-center justify-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.55px] uppercase whitespace-nowrap">Su</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="col-7 content-stretch flex items-center justify-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Text7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="grid grid-cols-[_______46.84px_46.86px_46.86px_46.86px_46.86px_46.86px_46.86px] grid-rows-[_16.50px] pb-[8px] pt-[20px] px-[16px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container14() {
  return <div className="bg-[rgba(255,255,255,0.1)] h-px relative shrink-0 w-full" data-name="Container" />;
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container14 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">1</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="col-1 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">2</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="col-2 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">3</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="col-3 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">4</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="col-4 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">5</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="col-5 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button6 />
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">6</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="col-6 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button7 />
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">7</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="col-7 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button8 />
    </div>
  );
}

function Container16() {
  return (
    <div className="grid grid-cols-[_______46.84px_46.86px_46.86px_46.86px_46.86px_46.86px_46.86px] grid-rows-[_48px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">8</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="col-1 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button9 />
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">9</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="col-2 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button10 />
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">10</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="col-3 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button11 />
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">11</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="col-4 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button12 />
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">12</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="col-5 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button13 />
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">13</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="col-6 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button14 />
    </div>
  );
}

function Button15() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">14</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="col-7 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button15 />
    </div>
  );
}

function Container24() {
  return (
    <div className="grid grid-cols-[_______46.84px_46.86px_46.86px_46.86px_46.86px_46.86px_46.86px] grid-rows-[_48px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
    </div>
  );
}

function Button16() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">15</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="col-1 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button16 />
    </div>
  );
}

function Button17() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">16</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="col-2 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button17 />
    </div>
  );
}

function Button18() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">17</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="col-3 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button18 />
    </div>
  );
}

function Button19() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">18</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="col-4 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button19 />
    </div>
  );
}

function Button20() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">19</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="col-5 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button20 />
    </div>
  );
}

function Button21() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">20</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="col-6 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button21 />
    </div>
  );
}

function Button22() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">21</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="col-7 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button22 />
    </div>
  );
}

function Container32() {
  return (
    <div className="grid grid-cols-[_______46.84px_46.86px_46.86px_46.86px_46.86px_46.86px_46.86px] grid-rows-[_48px] relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
      <Container39 />
    </div>
  );
}

function Button23() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">22</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="col-1 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button23 />
    </div>
  );
}

function Button24() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">23</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="col-2 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button24 />
    </div>
  );
}

function Button25() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">24</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="col-3 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button25 />
    </div>
  );
}

function Button26() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">25</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="col-4 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button26 />
    </div>
  );
}

function Button27() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">26</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="col-5 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button27 />
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_11px_8.25px_rgba(255,255,255,0.2),0px_4.4px_3.3px_rgba(255,255,255,0.2)] flex items-center justify-center left-[-1.8px] rounded-[36909840px] size-[39.6px] top-[-1.8px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[23.1px] not-italic relative shrink-0 text-[#312c85] text-[15.4px] text-center whitespace-nowrap">27</p>
    </div>
  );
}

function ButtonTransform() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[36px]" data-name="Button:transform">
      <Button28 />
    </div>
  );
}

function Container46() {
  return (
    <div className="col-6 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <ButtonTransform />
    </div>
  );
}

function Button29() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">28</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="col-7 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button29 />
    </div>
  );
}

function Container40() {
  return (
    <div className="grid grid-cols-[_______46.84px_46.86px_46.86px_46.86px_46.86px_46.86px_46.86px] grid-rows-[_48px] relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <Container42 />
      <Container43 />
      <Container44 />
      <Container45 />
      <Container46 />
      <Container47 />
    </div>
  );
}

function Button30() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">29</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="col-1 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button30 />
    </div>
  );
}

function Button31() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">30</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="col-2 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button31 />
    </div>
  );
}

function Button32() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">31</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="col-3 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Button32 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.15)] whitespace-nowrap">1</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="col-4 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.15)] whitespace-nowrap">1</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="col-5 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.15)] whitespace-nowrap">1</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="col-6 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.15)] whitespace-nowrap">1</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="col-7 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Text11 />
    </div>
  );
}

function Container48() {
  return (
    <div className="grid grid-cols-[_______46.84px_46.86px_46.86px_46.86px_46.86px_46.86px_46.86px] grid-rows-[_48px] relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Container50 />
      <Container51 />
      <Container52 />
      <Container53 />
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container57() {
  return <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container" />;
}

function Container58() {
  return <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container" />;
}

function Container59() {
  return <div className="col-3 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container" />;
}

function Text12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">1</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="col-4 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">2</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="col-5 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">3</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="col-6 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">4</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="col-7 content-stretch flex items-center justify-center justify-self-stretch py-[6px] relative row-1 self-stretch shrink-0" data-name="Container">
      <Text15 />
    </div>
  );
}

function Container56() {
  return (
    <div className="grid grid-cols-[_______46.84px_46.86px_46.86px_46.86px_46.86px_46.86px_46.86px] grid-rows-[_48px] relative shrink-0 w-full" data-name="Container">
      <Container57 />
      <Container58 />
      <Container59 />
      <Container60 />
      <Container61 />
      <Container62 />
      <Container63 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col h-[316px] items-start pb-[20px] pt-[8px] px-[16px] relative shrink-0 w-[360px]" data-name="Container">
      <Container16 />
      <Container24 />
      <Container32 />
      <Container40 />
      <Container48 />
      <Container56 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[363.5px] relative rounded-[28px] shrink-0 w-[362px]" data-name="Container">
      <div aria-hidden className="absolute backdrop-blur-[24px] bg-[rgba(255,255,255,0.1)] inset-0 pointer-events-none rounded-[28px]" />
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container6 />
        <ContainerMargin />
        <Container15 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]" />
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.18)] border-solid inset-0 pointer-events-none rounded-[28px] shadow-[0px_20px_60px_0px_rgba(0,0,0,0.3)]" />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[1px] uppercase whitespace-nowrap">Selected</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pt-[2px] relative shrink-0 w-[137px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">May 27, 2023</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] border-solid content-stretch flex flex-[137_0_0] flex-col items-start min-w-px px-[16px] py-[12px] relative rounded-[16px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[1px] uppercase whitespace-nowrap">Schedule</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pt-[2px] relative shrink-0 w-[137px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">0 events</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] border-solid content-stretch flex flex-[137_0_0] flex-col items-start min-w-px px-[16px] py-[12px] relative rounded-[16px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[4px] relative shrink-0 w-[362px]" data-name="Container">
      <Container65 />
      <Container66 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="Icon">
          <path d="M9 3.75V14.25M3.75 9H14.25" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
        </g>
      </svg>
    </div>
  );
}

function Button33() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center py-[16px] relative rounded-[16px] shrink-0 w-[362px]" data-name="Button">
      <div aria-hidden className="absolute backdrop-blur-[20px] inset-0 pointer-events-none rounded-[16px]" style={{ backgroundImage: "linear-gradient(170.5890180824569deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)" }} />
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.2)]" />
      <Icon3 />
      <p className="[word-break:break-word] font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[25.5px] not-italic relative shrink-0 text-[17px] text-center text-white tracking-[-0.425px] whitespace-nowrap">학습등록</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25)]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[768.5_0_0] flex-col gap-[24px] items-center min-h-px pb-[40px] pt-[16px] px-[20px] relative" data-name="Container">
      <Container2 />
      <Container5 />
      <Container64 />
      <Button33 />
    </div>
  );
}

function Container69() {
  return <div className="bg-[rgba(255,255,255,0.2)] h-[5px] relative rounded-[33554400px] shrink-0 w-[40px]" data-name="Container" />;
}

function Container68() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[4px] pt-[12px] relative shrink-0 w-full" data-name="Container">
      <Container69 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.3)] tracking-[0.8px] uppercase whitespace-nowrap">학습 일정</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pt-[4px] relative shrink-0 w-[90px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[27.5px] not-italic relative shrink-0 text-[22px] text-white whitespace-nowrap">5월 27일</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="Icon">
          <path d={svgPaths.p26740b90} id="Vector" stroke="white" strokeLinecap="round" strokeOpacity="0.6" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button34() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[16px] pt-[12px] px-[24px] relative shrink-0 w-full" data-name="Container">
      <Container71 />
      <Button34 />
    </div>
  );
}

function Container72() {
  return <div className="bg-[rgba(255,255,255,0.1)] h-px relative shrink-0 w-full" data-name="Container" />;
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container72 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] border-solid content-stretch flex flex-col h-[47px] items-start justify-center overflow-clip px-[16px] py-[12px] relative rounded-[14px] shrink-0 w-[320px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.28)] w-full">과목명 (예: 수학 — 미적분)</p>
    </div>
  );
}

function TimePicker() {
  return <div className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] border-solid flex-[210_0_0] h-[47px] min-w-px relative rounded-[14px]" data-name="Time Picker" />;
}

function NumberInput() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] border-solid content-stretch flex flex-col h-[47px] items-start justify-center left-0 overflow-clip pl-[16px] pr-[32px] py-[12px] rounded-[14px] top-0 w-[100px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.28)] w-full">분</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[47px] relative shrink-0 w-[100px]" data-name="Container">
      <NumberInput />
      <p className="[word-break:break-word] absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[19.5px] left-[76.02px] not-italic text-[13px] text-[rgba(255,255,255,0.3)] top-[13.5px] whitespace-nowrap">분</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <TimePicker />
      <Container75 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] border-solid content-stretch flex flex-col h-[47px] items-start justify-center overflow-clip px-[16px] py-[12px] relative rounded-[14px] shrink-0 w-[320px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.28)] w-full">과목 태그 (예: 수학)</p>
    </div>
  );
}

function Button35() {
  return (
    <div className="bg-[rgba(255,255,255,0.07)] content-stretch flex flex-[156_0_0] flex-col h-[45px] items-center justify-center min-w-px py-[12px] relative rounded-[12px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">취소</p>
    </div>
  );
}

function Button36() {
  return (
    <div className="bg-[#818cf8] content-stretch flex flex-[156_0_0] flex-col h-[45px] items-center justify-center min-w-px py-[12px] relative rounded-[12px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">등록</p>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex gap-[8px] h-[49px] items-start pt-[4px] relative shrink-0 w-[320px]" data-name="Container">
      <Button35 />
      <Button36 />
    </div>
  );
}

function Form() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col gap-[8px] items-start p-[16px] relative rounded-[16px] shrink-0 w-full" data-name="Form">
      <TextInput />
      <Container74 />
      <TextInput1 />
      <Container76 />
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col h-[272px] items-start max-h-[456.75px] overflow-clip pb-[8px] pt-[16px] px-[24px] relative shrink-0 w-[402px]" data-name="Container">
      <Form />
    </div>
  );
}

function Container77() {
  return <div className="h-[32px] relative shrink-0 w-full" data-name="Container" />;
}

function Container67() {
  return (
    <div className="border-[rgba(255,255,255,0.12)] border-solid border-t content-stretch flex flex-col items-start relative rounded-tl-[28px] rounded-tr-[28px] shadow-[0px_-20px_60px_0px_rgba(0,0,0,0.5)] shrink-0 w-[402px]" style={{ backgroundImage: "linear-gradient(159.8381727803115deg, rgba(49, 46, 129, 0.98) 46.43%, rgba(30, 27, 75, 0.99) 87.026%)" }} data-name="Container">
      <Container68 />
      <Container70 />
      <ContainerMargin1 />
      <Container73 />
      <Container77 />
    </div>
  );
}

function App() {
  return (
    <div className="content-stretch flex flex-col h-[900px] items-start relative shrink-0 w-full" style={{ backgroundImage: "linear-gradient(140.82482950648756deg, rgb(30, 27, 75) 8.4861%, rgb(49, 46, 129) 37.546%, rgb(67, 56, 202) 62.454%, rgb(96, 45, 213) 82.841%)" }} data-name="App">
      <Statusbar />
      <Container1 />
      <Container67 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="학습노트">
      <App />
    </div>
  );
}