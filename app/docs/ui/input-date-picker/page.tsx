"use client";

import { InputDatePicker } from "@/components/helisa/ui/input-date-picker";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Typography } from "../../../../components/helisa/ui/typography";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Separator } from "@/components/ui/separator";

const SinglePicker = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const codeString = `
   const [date, setDate] = useState<Date | undefined>(undefined);

   <InputDatePicker
        selected={date}
        onSelect={setDate}
        mode="single"
        clearEnable
        onClear={() => {
          setDate(undefined);
        }}
      />
   `;

  const codeExample = () => {
    return (
      <div className="flex flex-col gap-5 max-w-sm ">
        <InputDatePicker
          selected={date}
          onSelect={setDate}
          mode="single"
          clearEnable
          onClear={() => {
            setDate(undefined);
          }}
        />
        <Typography variant="small">
          {`Fecha seleccionada: ${date ? format(date, "yyyy/MM/dd") : "Ninguna"}`}
        </Typography>
      </div>
    );
  };

  return (
    <Tabs defaultValue="preview" className="mt-5">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        {/* Preview */}
        {codeExample()}
      </TabsContent>
      <TabsContent value="code">
        {/* Code */}
        <SyntaxHighlighter style={github} language="typescript">
          {codeString}
        </SyntaxHighlighter>
      </TabsContent>
    </Tabs>
  );
};

const RangePicker = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 18),
    to: new Date(2025, 6, 7),
  });

  const codeString = `
   const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 18),
    to: new Date(2025, 6, 7),
  });

   <InputDatePicker
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      min={2}
      max={20}
      clearEnable
      onClear={() => {
        setDateRange(undefined);
      }}
    />
   `;

  const codeExample = () => {
    return (
      <div className="flex flex-col gap-5 max-w-sm ">
        <InputDatePicker
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          min={2}
          max={20}
          clearEnable
          onClear={() => {
            setDateRange(undefined);
          }}
        />
        <Typography variant="small">
          {`Rango de fechas seleccionadas: ${
            dateRange?.from
              ? dateRange.to
                ? `${format(dateRange.from, "yyyy/MM/dd")} - ${format(dateRange.to, "yyyy/MM/dd")}`
                : `${format(dateRange.from, "yyyy/MM/dd")} - ...`
              : "Ninguna"
          }`}
        </Typography>
      </div>
    );
  };

  return (
    <Tabs defaultValue="preview" className="mt-5">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        {/* Preview */}
        {codeExample()}
      </TabsContent>
      <TabsContent value="code">
        {/* Code */}
        <SyntaxHighlighter style={github} language="typescript">
          {codeString}
        </SyntaxHighlighter>
      </TabsContent>
    </Tabs>
  );
};

const MultiPicker = () => {
  const [dates, setDates] = React.useState<Date[]>([
    new Date(2025, 5, 12),
    new Date(2025, 6, 24),
  ]);

  const codeString = `
   const [dates, setDates] = React.useState<Date[]>([
    new Date(2025, 5, 12),
    new Date(2025, 6, 24),
  ]);

    <InputDatePicker
        mode="multiple"
        numberOfMonths={2}
        defaultMonth={dates[0]}
        required
        selected={dates}
        onSelect={setDates}
        max={20}
        clearEnable
        onClear={() => {
          setDates([]);
        }}
      />
   `;

  const codeExample = () => {
    return (
      <div className="flex flex-col gap-5 max-w-sm ">
        <InputDatePicker
          mode="multiple"
          numberOfMonths={2}
          defaultMonth={dates[0]}
          required
          selected={dates}
          onSelect={setDates}
          max={20}
          clearEnable
          onClear={() => {
            setDates([]);
          }}
        />
        <Typography variant="small">
          {`Fechas múltiples seleccionadas: ${
            dates.length > 0
              ? dates.map((d) => format(d, "yyyy/MM/dd")).join(", ")
              : "Ninguna"
          }`}
        </Typography>
      </div>
    );
  };

  return (
    <Tabs defaultValue="preview" className="mt-5">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        {/* Preview */}
        {codeExample()}
      </TabsContent>
      <TabsContent value="code">
        {/* Code */}
        <SyntaxHighlighter style={github} language="typescript">
          {codeString}
        </SyntaxHighlighter>
      </TabsContent>
    </Tabs>
  );
};

const InputDatePickerPage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8 gap-1">
        <Typography variant="h1">Input Date Picker</Typography>
        <Typography variant="lead">
          Componente para seleccionar fechas individuales, múltiples o rangos de
          fechas mediante un calendario desplegable.
        </Typography>
        <Typography variant="lead">
          Las configuraciones son las mismas que las del componente DayPicker de
          la librería shadcn/ui.{" "}
          <a
            className="font-bold underline"
            href="https://ui.shadcn.com/blocks/calendar"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ui.shadcn.com/blocks/calendar
          </a>
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/input-date-picker
        </Typography>
      </div>

      <div className="flex flex-col gap-12 my-5">
        <div className="flex flex-col space-y-1 my-5">
          <Typography variant="h2">Single Date Picker</Typography>
          <Typography variant="body2">
            Input de fecha para seleccionar una sola fecha.
          </Typography>
          {SinglePicker()}
        </div>

        <Separator />

        <div className="flex flex-col space-y-1 my-5">
          <Typography variant="h2">Range Date Picker</Typography>
          <Typography variant="body2">
            Input de fecha para seleccionar un rango de fechas.
          </Typography>
          {RangePicker()}
        </div>

        <Separator />

        <div className="flex flex-col space-y-1 mt-5 mb-28">
          <Typography variant="h2">Multiple Date Picker</Typography>
          <Typography variant="body2">
            Input de fecha para seleccionar múltiples fechas.
          </Typography>
          {MultiPicker()}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default InputDatePickerPage;
