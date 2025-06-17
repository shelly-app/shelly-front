import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { H2, H3, Lead, Paragraph } from '@/components/ui/text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Heart, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useContactForm } from '../hooks/use-contact-form';
import { Progress } from '@/components/ui/progress';

export const Contact = () => {
  const [activeTab, setActiveTab] = useState('shelter');
  const {
    formData,
    isSubmitted,
    progress,
    isPending,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  if (isSubmitted) {
    return (
      <section
        id="contact"
        className="relative flex min-h-[600px] flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50 px-4 py-24 md:py-32"
      >
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <H2 className="text-center text-3xl font-bold md:text-4xl">
            ¡Mensaje enviado con éxito!
          </H2>
          <Lead className="text-lg">
            Gracias por contactarnos. Nos vamos a poner en contacto con vos
            pronto.
          </Lead>
          <Progress value={progress} className="w-full" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-[800px] flex-col items-center justify-center gap-16 overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50 px-4 py-24 md:py-32"
    >
      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <H2 className="text-center text-4xl font-bold md:text-5xl">
          Contactanos
        </H2>
        <Lead className="max-w-2xl text-lg md:text-xl">
          ¿Sos un refugio que quiere unirse a Shelly o un patrocinador
          interesado en apoyar nuestra causa?
        </Lead>
      </div>

      <Separator className="w-full max-w-3xl bg-transparent bg-radial-[at_50%_50%] from-amber-400/80 to-transparent" />

      <div className="mx-auto w-full max-w-4xl px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="shelter"
              disabled={isPending}
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              Refugio
            </TabsTrigger>
            <TabsTrigger
              value="sponsor"
              disabled={isPending}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Patrocinador
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shelter" className="mt-8">
            <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-6 text-center">
                <H3 className="text-2xl font-semibold">
                  Solicitá acceso para tu refugio
                </H3>
                <Paragraph className="mt-2 text-gray-600">
                  Unite a nuestra red de refugios y empezá a encontrar hogares
                  para más mascotas
                </Paragraph>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="shelter-name">Nombre del refugio *</Label>
                    <Input
                      id="shelter-name"
                      value={formData.shelterName}
                      onChange={(e) =>
                        handleInputChange('shelterName', e.target.value)
                      }
                      placeholder="Ej: Refugio Amor Animal"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shelter-type">Tipo de refugio *</Label>
                    <Input
                      id="shelter-type"
                      value={formData.shelterType}
                      onChange={(e) =>
                        handleInputChange('shelterType', e.target.value)
                      }
                      placeholder="Ej: Perros y gatos, Solo perros, etc."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shelter-location">
                    Ubicación del refugio *
                  </Label>
                  <Input
                    id="shelter-location"
                    value={formData.shelterLocation}
                    onChange={(e) =>
                      handleInputChange('shelterLocation', e.target.value)
                    }
                    placeholder="Ciudad, Provincia, País"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Nombre del contacto *</Label>
                    <Input
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Teléfono</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shelter-message">Mensaje *</Label>
                  <Textarea
                    id="shelter-message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                    placeholder="Contanos sobre tu refugio, cuántas mascotas tenés actualmente, y cualquier información adicional que consideres relevante..."
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Solicitar acceso
                    </>
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="sponsor" className="mt-8">
            <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-6 text-center">
                <H3 className="text-2xl font-semibold">
                  Sé parte de nuestra misión
                </H3>
                <Paragraph className="mt-2 text-gray-600">
                  Apoyá nuestro proyecto y ayudanos a conectar más mascotas con
                  sus familias ideales
                </Paragraph>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-name">Nombre completo *</Label>
                    <Input
                      id="sponsor-name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-email">Email *</Label>
                    <Input
                      id="sponsor-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-organization">Organización</Label>
                    <Input
                      id="sponsor-organization"
                      value={formData.organization}
                      onChange={(e) =>
                        handleInputChange('organization', e.target.value)
                      }
                      placeholder="Nombre de tu empresa u organización"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-phone">Teléfono</Label>
                    <Input
                      id="sponsor-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contacthip-type">
                      Tipo de patrocinio *
                    </Label>
                    <Input
                      id="contacthip-type"
                      value={formData.contacthipType}
                      onChange={(e) =>
                        handleInputChange('contacthipType', e.target.value)
                      }
                      placeholder="Ej: Donación única, Patrocinio mensual, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-budget">
                      Presupuesto aproximado
                    </Label>
                    <Input
                      id="sponsor-budget"
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange('budget', e.target.value)
                      }
                      placeholder="Ej: $10,000 - $50,000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sponsor-message">Mensaje *</Label>
                  <Textarea
                    id="sponsor-message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                    placeholder="Contanos sobre tu interés en patrocinar Shelly, cómo te gustaría colaborar, y cualquier pregunta que tengas..."
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
