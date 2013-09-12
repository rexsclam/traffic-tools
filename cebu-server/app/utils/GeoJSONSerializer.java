/*
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

package utils;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;
import org.geotools.geojson.geom.GeometryJSON;
import org.geotools.geometry.jts.JTS;
import org.opengis.geometry.MismatchedDimensionException;
import org.opengis.referencing.operation.MathTransform;
import org.opengis.referencing.operation.NoninvertibleTransformException;
import org.opengis.referencing.operation.TransformException;


import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;

public class GeoJSONSerializer extends JsonSerializer<Geometry> {

  @Override
  public Class<Geometry> handledType() {
    return Geometry.class;
  }

  @Override
  public void serialize(Geometry value, JsonGenerator jgen,
    SerializerProvider provider) throws IOException,
      JsonProcessingException {

    if (value == null) {
      jgen.writeRawValue(null);
      return;
    }

    final GeometryJSON json = new GeometryJSON();
    final Coordinate refLatLon = (Coordinate)value.getUserData();
    MathTransform transform = GeoUtils.getTransform(refLatLon);
    final Geometry transformed = GeoUtils.invertGeom(value, transform);
    jgen.writeRawValue(json.toString(transformed));

  }
}
