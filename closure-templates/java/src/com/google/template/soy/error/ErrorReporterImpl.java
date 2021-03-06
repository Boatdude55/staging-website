/*
 * Copyright 2015 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.template.soy.error;

import com.google.common.base.Optional;
import com.google.common.base.Strings;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.template.soy.base.SourceLocation;
import com.google.template.soy.base.internal.SoyFileSupplier;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Simple {@link com.google.template.soy.error.ErrorReporter} implementation.
 *
 * @author brndn@google.com (Brendan Linn)
 */
final class ErrorReporterImpl extends ErrorReporter {

  private final List<SoyError> errors = new ArrayList<>();
  private final List<SoyError> warnings = new ArrayList<>();
  private final ImmutableMap<String, SoyFileSupplier> filePathsToSuppliers;

  ErrorReporterImpl(ImmutableMap<String, SoyFileSupplier> filePathsToSuppliers) {
    this.filePathsToSuppliers = filePathsToSuppliers;
  }

  @Override
  public void report(SourceLocation location, SoyErrorKind kind, Object... args) {
    String message = kind.format(args);
    errors.add(
        SoyError.create(location, kind, message, getSnippet(location), /* isWarning= */ false));
  }

  @Override
  public void warn(SourceLocation location, SoyErrorKind kind, Object... args) {
    String message = kind.format(args);
    warnings.add(
        SoyError.create(location, kind, message, getSnippet(location), /* isWarning= */ true));
  }

  @Override
  public ImmutableList<SoyError> getErrors() {
    return ImmutableList.copyOf(errors);
  }

  @Override
  public ImmutableList<SoyError> getWarnings() {
    return ImmutableList.copyOf(warnings);
  }

  @Override
  int getCurrentNumberOfErrors() {
    return errors.size();
  }

  /** Returns a source line snippet with a caret pointing at the error column offset. */
  private Optional<String> getSnippet(SourceLocation sourceLocation) {
    // Try to find a snippet of source code associated with the exception and print it.
    Optional<String> snippet = getSourceLine(sourceLocation);
    // TODO(user): this is a result of calling SoySyntaxException#createWithoutMetaInfo,
    // which occurs almost 100 times. Clean them up.
    if (snippet.isPresent()) {
      StringBuilder builder = new StringBuilder();
      builder.append(snippet.get()).append("\n");
      // Print a caret below the error.
      // TODO(brndn): SourceLocation.beginColumn is occasionally -1. Review all SoySyntaxException
      // instantiations and ensure the SourceLocation is well-formed.
      int beginColumn = Math.max(sourceLocation.getBeginColumn(), 1);
      String caretLine = Strings.repeat(" ", beginColumn - 1) + "^";
      builder.append(caretLine).append("\n");
      return Optional.of(builder.toString());
    }
    return Optional.absent();
  }

  /**
   * Returns a snippet of source code surrounding the given {@link SourceLocation}, or {@link
   * Optional#absent()} if source code is unavailable. (This happens, for example, when anyone uses
   * {@link SourceLocation#UNKNOWN}, which is why no one should use it.)
   */
  Optional<String> getSourceLine(SourceLocation sourceLocation) {
    // Try to find a snippet of source code associated with the exception and print it.
    SoyFileSupplier supplier = filePathsToSuppliers.get(sourceLocation.getFilePath());
    if (supplier == null) {
      return Optional.absent();
    }
    String result;
    try (BufferedReader reader = new BufferedReader(supplier.open())) {
      // Line numbers are 1-indexed
      for (int linenum = 1; linenum < sourceLocation.getBeginLine(); ++linenum) {
        // Skip preceding lines
        reader.readLine();
      }
      result = reader.readLine(); // returns null on EOF
    } catch (IOException ioe) {
      return Optional.absent();
    }
    return Optional.fromNullable(result);
  }
}
