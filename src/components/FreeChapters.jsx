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
      <h2 id="free-chapters-title" className="sr-only">
        Free preview
      </h2>
      <div className="overflow-hidden lg:relative">
        <Container
          size="md"
          className="relative grid grid-cols-1 items-end gap-y-12 py-20 lg:static lg:grid-cols-2 lg:py-28 xl:py-32"
        >
          {/* <Pattern className="absolute -top-32 left-0 w-full sm:left-3/4 sm:-top-5 sm:ml-8 sm:w-auto md:left-2/3 lg:left-auto lg:right-2 lg:ml-0 xl:right-auto xl:left-2/3" /> */}
          <div>
            <h3 className="text-base font-medium tracking-tight text-white">
              Discuss, share and download Lecture Notes, eBooks, handouts,
              seminars & presentations, major & minor projects, previous Year &
              Sample Semester papers for all engineering branches and trades
            </h3>
            <h3 className="mt-5 text-base font-bold tracking-tight text-white">Stay tuned!! There are so many features comming up</h3>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:w-3/4 sm:text-6xl md:w-2/3 lg:w-auto"></h2>
            <p className="mt-4 text-lg tracking-tight text-blue-200">
              I will be Uploading/Updating all the pdf's in their respective
              folders. So bookmark this page or add folders to Google Drive's
              Starred list. Also Click bellow to directly share on Whatsapp.
            </p>
            <ButtonLink
              href="whatsapp://send?text=https://www.msrit.ml/"
              color="white"
              className="mt-5 shadow-xl"
            >
              Share
            </ButtonLink>
          </div>
          <form className="lg:pl-16">
            <h3 className="text-base font-medium tracking-tight text-white">
              Anything Missing ?
            </h3>
            <div className="mt-2 sm:relative sm:flex sm:items-center sm:py-0.5 sm:pr-2.5">
              {/* <div className="relative sm:static sm:flex-auto">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email-address"
                  required
                  placeholder="Email address"
                  className="peer relative z-10 w-full appearance-none bg-transparent px-4 py-2 text-base text-white placeholder:text-white/70 focus:outline-none sm:py-3"
                />
                <div className="absolute inset-0 rounded-md border border-white/20 peer-focus:border-blue-300 peer-focus:bg-blue-500 peer-focus:ring-1 peer-focus:ring-blue-300 sm:rounded-xl" />
              </div> */}
              {/* <Button
                type="submit"
                color="white"
                className="mt-4 w-full sm:relative sm:z-10 sm:mt-0 sm:w-auto sm:flex-none"
              >
                Add Here
              </Button> */}
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
          </form>
        </Container>
      </div>
    </section>
  )
}
