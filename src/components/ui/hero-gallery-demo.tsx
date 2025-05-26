
import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/ui/hero-gallery-scroll-animation"
import { Button } from "@/components/ui/button"
import about1 from "@/assets/images/about_1.jpg"
import about2 from "@/assets/images/about_2.jpg"
import about3 from "@/assets/images/about_3.jpg"  
import about4 from "@/assets/images/about_4.jpg"
import about5 from "@/assets/images/about_5.jpg"

const IMAGES = [
  about2,
  about1,
  about3,
  about4,
  about5
]

const HeroDemo1 = () => {
  return (
    <ContainerScroll className="h-[350vh]">
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
        {IMAGES.map((imageUrl, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-xl shadow-xl"
          >
            <img
              className="size-full object-cover object-center"
              src={imageUrl}
              alt=""
            />
          </BentoCell>
        ))}
      </BentoGrid>

      <ContainerScale className="relative z-10 text-center">
        <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800 dark:text-white">
          About Our Company
        </h1>
        <p className="my-6 max-w-xl text-sm text-slate-700 dark:text-slate-300 md:text-base">
          Founded in 2025, our creative studio brings together experts in video production,
          photography, and digital content creation. We specialize in crafting compelling narratives 
          
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button className="bg-primary px-4 py-2 font-medium hover:bg-primary/80">
            Our Mission
          </Button>
          <Button
            variant="link"
            className="bg-transparent px-4 py-2 font-medium"
          >
            Learn more
          </Button>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}

export { HeroDemo1 }
