import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TermsConditionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsConditionsDialog = ({
  open,
  onOpenChange,
}: TermsConditionsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto p-12 sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Términos y Condiciones</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="adopters" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="adopters">Para Adoptantes</TabsTrigger>
            <TabsTrigger value="shelters">Para Refugios</TabsTrigger>
          </TabsList>

          <TabsContent value="adopters" className="mt-6 space-y-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="pb-1 text-lg font-semibold">
                Términos y Condiciones para Adoptantes
              </h3>
              <p className="text-muted-foreground mb-4 text-xs italic">
                Última actualización: 18 de agosto de 2025
              </p>
              <div className="text-muted-foreground space-y-3 text-sm">
                <h4 className="text-md text-foreground font-semibold">
                  1. Objeto
                </h4>
                <p className="pl-5">
                  El presente contrato regula el uso de la aplicación por parte
                  de los adoptantes, quienes acceden a ella con el fin de
                  postularse a la adopción responsable de animales gestionados
                  por refugios registrados.
                </p>
                <h4 className="text-md text-foreground font-semibold">
                  2. Uso de la Plataforma
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>
                    El adoptante declara que los datos personales proporcionados
                    son veraces y actualizados.
                  </li>
                  <li>
                    Se compromete a garantizar el bienestar del animal adoptado.
                  </li>
                  <li>
                    Acepta que la verificación de la información y la decisión
                    final de adopción corresponden exclusivamente al refugio.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  3. Protección de Datos Personales
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>
                    El adoptante autoriza el tratamiento de sus datos conforme a
                    la Ley 25.326 de Protección de Datos Personales.
                  </li>
                  <li>
                    Podrá solicitar en cualquier momento la eliminación de sus
                    datos personales.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  4. Limitación de Responsabilidad
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>
                    La aplicación actúa únicamente como intermediario
                    tecnológico y no garantiza adopciones.
                  </li>
                  <li>
                    El equipo de desarrollo no es responsable de disputas,
                    incumplimientos o consecuencias derivadas de la adopción.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  5. Conductas Prohibidas
                </h4>
                <p className="pl-5">Se prohíbe:</p>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>Proporcionar información falsa.</li>
                  <li>Suplantar identidades.</li>
                  <li>
                    Usar indebidamente datos de contacto de refugios u otros
                    usuarios.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  6. Consecuencias del Incumplimiento
                </h4>
                <p className="pl-5">
                  El incumplimiento de estos términos podrá derivar en:
                </p>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>Suspensión o eliminación de la cuenta.</li>
                  <li>Notificación al refugio correspondiente.</li>
                  <li>Denuncias ante autoridades competentes.</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  7. Aceptación de Condiciones
                </h4>
                <p className="pl-5">
                  El uso de la aplicación implica la aceptación total del
                  presente contrato.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shelters" className="mt-6 space-y-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="pb-1 text-lg font-semibold">
                Términos y Condiciones para Refugios
              </h3>
              <p className="text-muted-foreground mb-4 text-xs italic">
                Última actualización: 18 de agosto de 2025
              </p>
              <div className="text-muted-foreground space-y-3 text-sm">
                <h4 className="text-md text-foreground font-semibold">
                  1. Objeto
                </h4>
                <p className="pl-5">
                  Este contrato regula el uso de la aplicación por parte de los
                  refugios, quienes utilizan la plataforma para gestionar
                  procesos de adopción y publicación de animales.
                </p>
                <h4 className="text-md text-foreground font-semibold">
                  2. Responsabilidades del Refugio
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>
                    Verificar la información proporcionada por los adoptantes.
                  </li>
                  <li>
                    Evaluar el compromiso del adoptante y tomar decisiones sobre
                    adopciones.
                  </li>
                  <li>
                    Garantizar que las imágenes y descripciones de animales
                    subidas a la plataforma no infringen derechos de terceros.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  3. Protección de Datos Personales
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>
                    El refugio autoriza el tratamiento de sus datos conforme a
                    la Ley 25.326.
                  </li>
                  <li>
                    Podrá solicitar la baja y eliminación de sus datos en
                    cualquier momento.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  4. Propiedad Intelectual
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>
                    El refugio conserva la titularidad de las imágenes y
                    descripciones cargadas.
                  </li>
                  <li>
                    Autoriza a la aplicación a mostrar y procesar dichos datos
                    únicamente para el funcionamiento de la plataforma.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  5. Limitación de Responsabilidad
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>
                    La aplicación actúa como intermediario tecnológico, sin
                    garantizar adopciones ni resultados.
                  </li>
                  <li>
                    El equipo de desarrollo no se hace responsable de conflictos
                    con adoptantes ni de la disponibilidad permanente del
                    servicio.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  6. Conductas Prohibidas
                </h4>
                <p className="pl-5">Se prohíbe:</p>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>Publicar información falsa o inexacta.</li>
                  <li>
                    Usar datos de contacto de adoptantes con fines distintos al
                    proceso de adopción.
                  </li>
                  <li>
                    Manipular el sistema de adopciones de forma que comprometa
                    el bienestar animal.
                  </li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  7. Consecuencias del Incumplimiento
                </h4>
                <p className="pl-5">El incumplimiento podrá derivar en:</p>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>Suspensión o eliminación de la cuenta.</li>
                  <li>Denuncias ante autoridades competentes.</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  8. Aceptación de Condiciones
                </h4>
                <p className="pl-5">
                  El uso de la aplicación implica la aceptación total del
                  presente contrato.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
