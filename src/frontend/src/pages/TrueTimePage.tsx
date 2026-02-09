import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EquationOfTimePanel from '../components/true-time/EquationOfTimePanel';
import AnalemmaViz from '../components/true-time/AnalemmaViz';
import HorizonDial from '../components/true-time/HorizonDial';
import { useI18n } from '../state/i18n/useI18n';

export default function TrueTimePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useI18n();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">{t('trueTime.title')}</h1>
        <p className="text-lg text-amber-800">{t('trueTime.subtitle')}</p>
      </div>

      <Tabs defaultValue="horizon" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-amber-100/50">
          <TabsTrigger value="horizon" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
            {t('trueTime.horizonDial')}
          </TabsTrigger>
          <TabsTrigger value="analemma" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
            {t('trueTime.analemma')}
          </TabsTrigger>
          <TabsTrigger value="equation" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
            {t('trueTime.equationOfTime')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="horizon" className="space-y-6">
          <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-amber-900">{t('trueTime.horizonDial')}</CardTitle>
            </CardHeader>
            <CardContent>
              <HorizonDial />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analemma" className="space-y-6">
          <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-amber-900">{t('trueTime.analemma')}</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalemmaViz selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equation" className="space-y-6">
          <EquationOfTimePanel selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
