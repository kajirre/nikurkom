import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = { title: 'Sobre el Archivo | Archivo Digital Pijao' }

export default function SobreArchivoPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 font-sans">
            <Breadcrumbs items={[{ name: 'Sobre el archivo', href: '/sobre-el-archivo' }]} />
            <article className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8">Sobre el Archivo Digital Pijao</h1>

                <p>
                    Este archivo nace como una respuesta técnica y política a la desinformación sobre el pueblo Pijao en el entorno digital.
                    No es una plataforma turística ni un repositorio espiritualista; es una herramienta de <strong>autoridad, territorio y memoria</strong>.
                </p>

                <h2>Propósito Editorial</h2>
                <p>
                    Buscamos corregir las narrativas que presentan al pueblo Pijao como una cultura extinta. Este espacio documenta la
                    <strong> presencia activa</strong>, los procesos de recuperación de tierras y los proyectos productivos contemporáneos.
                </p>

                <h2>Metodología de Validación</h2>
                <p>
                    Cada ficha técnica (territorio, persona, proceso) pasa por un proceso de validación comunitaria.
                    Diferenciamos el conocimiento de archivo histórico del testimonio oral y la producción contemporánea,
                    asegurando la trazabilidad de cada dato publicado.
                </p>

                <h2>Escalabilidad</h2>
                <p>
                    Diseñado como una infraestructura de datos de largo aliento, este archivo permite el crecimiento modular
                    hacia el uso educativo institucional y la consultoría cultural especializada.
                </p>
            </article>
        </div>
    )
}
