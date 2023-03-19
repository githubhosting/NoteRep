import { Button, ButtonLink } from '@/components/Buttonf'
import { Container } from '@/components/Container1'
import { Pattern } from '@/components/Pattern1'

export function FreeChapters() {
  return (
    <section
      id="free-chapters"
      aria-labelledby="free-chapters-title"
      className="scroll-mt-14 bg-blue-600 sm:scroll-mt-32 pt-10"
    >
      <div className="overflow-hidden lg:relative">
        <Container
          size="md"
          className="relative grid grid-cols-1 items-center gap-y-12 py-10 align-middle lg:static lg:grid-cols-2 lg:py-14 xl:py-32"
        >
          <div>
            <h3 className="text-base font-medium tracking-tight text-white">
              Discuss, Share and Download Class Notes, eBooks, Handouts,
              Presentations, Faculty Notes, Previous Year & Sample Semester
              Papers for some of Engineering branches.
            </h3>
            <h3 className="mt-5 text-lg tracking-tight text-white">
              There are many other features coming up. Stay tuned !!
            </h3>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:w-3/4 sm:text-6xl md:w-2/3 lg:w-auto"></h2>
            <p className="mt-4 text-lg tracking-tight text-white/80">
              I will be Uploading/Updating all the pdf's in their respective
              folders. So bookmark this page or add folders to Google Drive's
              Starred list. Click below to directly share this website on
              Whatsapp.
            </p>
            <ButtonLink
              href="whatsapp://send?text=https://www.msrit.ml/"
              color="white"
              className="mt-5 shadow-xl"
            >
              Share
            </ButtonLink>
          </div>
          <div className="border-t pt-10 lg:ml-16 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
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
            <h3 className="mt-10 text-base font-medium tracking-tight text-white">
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
        </Container>
      </div>
    </section>
  )
}
