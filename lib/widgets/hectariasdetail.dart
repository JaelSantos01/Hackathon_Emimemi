import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../models/Hectaria.dart';

class HectareaDetailScreen extends StatelessWidget {
  final Hectarea hectarea;

  const HectareaDetailScreen({super.key, required this.hectarea});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Detalle de ${hectarea.identificador}')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Identificador: ${hectarea.identificador}', style: TextStyle(fontSize: 18)),
            SizedBox(height: 16),
            Text('Producción mensual (simulada)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            SizedBox(height: 200, child: buildBarChart()),
            SizedBox(height: 24),
            Text('Notas:', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text('Esta hectárea está en fase de crecimiento. Datos simulados para visualización.'),
          ],
        ),
      ),
    );
  }

  Widget buildBarChart() {
    return BarChart(
      BarChartData(
        alignment: BarChartAlignment.spaceAround,
        titlesData: FlTitlesData(
          leftTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: true),
          ),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                const months = ['Ene', 'Feb', 'Mar', 'Abr'];
                return Text(months[value.toInt()]);
              },
            ),
          ),
        ),
        barGroups: [
          BarChartGroupData(x: 0, barRods: [BarChartRodData(toY: 30, color: Colors.green)]),
          BarChartGroupData(x: 1, barRods: [BarChartRodData(toY: 42, color: Colors.green)]),
          BarChartGroupData(x: 2, barRods: [BarChartRodData(toY: 25, color: Colors.green)]),
          BarChartGroupData(x: 3, barRods: [BarChartRodData(toY: 50, color: Colors.green)]),
        ],
      ),
    );
  }
}