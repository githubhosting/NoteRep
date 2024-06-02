import { Button, ButtonLink } from '@/components/Buttonf'
import { Container } from '@/components/Container1'
import { Pattern } from '@/components/Pattern1'

export function FreeChapters() {
  return (
    <section
      id="free-chapters"
      aria-labelledby="free-chapters-title"
      className="scroll-mt-14 bg-blue-600 sm:scroll-mt-32"
    >
      <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-8">
        <div className="overflow-hidden lg:relative">
          <Container
            size="md"
            className="relative grid grid-cols-1 items-center gap-y-12 py-5 align-middle lg:static lg:py-8 xl:py-10"
          >
            <div>
              <h3 className="text-lg font-medium tracking-tight text-white">
                I know you all are tired of searching through endless className
                groups for that one PDF. And that's how NoteRep was born to
                solve it. With NoteRep, all the materials are conveniently
                organized for you to access and use at your fingertips.
              </h3>
              <p className="mt-4 text-base tracking-tight text-blue-50">
                I encourage you to bookmark this page or add these folders to
                your Google Drive's Starred list. You can also share our website
                directly on Whatsapp to help other students benefit from these
                resources.
              </p>
              <ButtonLink
                href="whatsapp://send?text=https://www.noterep.vercel.app/"
                color="white"
                className="mt-5 shadow-xl"
              >
                Share
              </ButtonLink>
            </div>
            <div className="grid grid-cols-1 items-center justify-center border-t p-4 align-middle lg:grid-cols-2">
              <div className="flex flex-col md:items-center">
                <h3 className="text-base font-medium tracking-tight text-white">
                  Anything Missing ?
                </h3>
                <div className="mt-2 sm:relative sm:flex sm:items-center sm:py-0.5 sm:pr-2.5">
                  <ButtonLink
                    href="https://drive.google.com/drive/folders/1qRi18giG_H8Zr8KtlSyVNCbjp2UruvRp?usp=sharing"
                    color="white"
                    className="mt-2 w-full shadow-lg sm:relative sm:z-10 sm:mt-0 sm:w-auto sm:flex-none"
                  >
                    Add Here
                  </ButtonLink>
                </div>
              </div>
              <div className="mt-5 flex flex-col md:items-center lg:mt-0">
                <h3 className="text-base font-medium tracking-tight text-white">
                  Get rewards by adding notes*
                </h3>
                <div className="mt-2 sm:relative sm:flex sm:items-center sm:py-0.5 sm:pr-2.5">
                  <ButtonLink
                    href="https://forms.gle/ZSdDTkuDpuxvPRwX8"
                    color="white"
                    className="mt-2 w-full shadow-lg sm:relative sm:z-10 sm:mt-0 sm:w-auto sm:flex-none"
                  >
                    Click Here
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
