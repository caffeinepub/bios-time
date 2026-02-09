import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VortexModule from '../components/vortex/VortexModule';
import RitualEditor from '../components/rituals/RitualEditor';
import RitualChecklist from '../components/rituals/RitualChecklist';

export default function RitualsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">Rituals & Focus</h1>
        <p className="text-lg text-amber-800">Align your actions with natural rhythms</p>
      </div>

      <Tabs defaultValue="vortex" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-amber-100/50">
          <TabsTrigger value="vortex" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
            Vortex Focus
          </TabsTrigger>
          <TabsTrigger value="rituals" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
            Personal Rituals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vortex" className="space-y-6">
          <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-amber-900">The Vortex</CardTitle>
            </CardHeader>
            <CardContent>
              <VortexModule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rituals" className="space-y-6">
          <RitualEditor />
          <RitualChecklist />
        </TabsContent>
      </Tabs>
    </div>
  );
}
