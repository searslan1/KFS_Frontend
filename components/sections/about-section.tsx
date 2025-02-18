export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-2 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F] bg-clip-text text-transparent">
            HAKKIMIZDA
          </h2>
          <div className="w-12 h-1 bg-[#4DB05F] rounded-full mx-auto mb-4" />
          <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            ARDVENTURE KFS, yenilikçi projeleri desteklemek ve girişimcilere fon sağlamak amacıyla kurulmuş, SPK
            lisanslı bir kitle fonlama platformudur. Misyonumuz, geleceğin projelerini bugünden destekleyerek
            Türkiye'nin ekonomik ve teknolojik gelişimine katkıda bulunmaktır.
          </p>
        </div>
      </div>
    </section>
  )
}

